import pandas as pd
import datetime
import math
import pyodbc

# You probably don't want the have such sensitive information here.
SERVER = 'SERVER'
DATABASE = 'DATABASE NAME'
USERNAME = 'USERNAME'
PASSWORD = 'PASSWORD'


# Unlike the rover csv, this one was written for processing a single file,
# but you can mimic the same implementation of the rover_csv to handle
# multiple files.

df = pd.read_csv('./GoProMetadata2-24.csv')
SRID = 3857

def applyDeg(row):
  if row.lonref == 'W':
    row.longitude = -row.longitude
  if row.latref == 'S':
    row.latitude = -row.latitude
  return row

df = df.apply(applyDeg, axis=1)
SEMI_MAJOR_AXIS = 6378137
HALF_SM_AXIS = SEMI_MAJOR_AXIS / 2
def lngLatToXY(lng, lat):
    x = 0.017453292519943 * lng * SEMI_MAJOR_AXIS
    y = lat * 0.017453292519943
    y = HALF_SM_AXIS * math.log((1 + math.sin(y)) / (1 - math.sin(y)))
    return (x,y)
def db_str(data):
    params = ",".join(list(data.keys()))
    query = f"insert into sdwk.gp_meta ({params}) select {','.join(['?' for _ in range(len(data.keys()))])}"
    return query

def prep_date(str):
  format_str = '%m/%d/%Y'
  datetime_item = datetime.datetime.strptime(str, format_str)
  return datetime_item.date()

def nearest_sw(longitude, latitude):
  shape = f"geometry::STGeomFromText('POINT(' + cast({longitude} as varchar) + ' ' + cast ({latitude} as varchar) + ')', 3857)"
  query = f"(select top(1) b.SIDEWALK_ID from sdwk.sidewalks_wm as b order by b.Shape.STDistance({shape}))"
  return query

cols = df.columns
def toDegree(data, ref):
    l = list((str(data).replace('[', '')).replace(']', '').split(','))
    s = l[2].split('/')
    deg = float(l[0]) + (1/60)*float(l[1]) + (float(s[0])/float(s[1]))*(1/(60*60))
    
    return -deg if (ref == "S" or ref == "W") else deg

gp_meta = []
for _, row in df.iterrows():

    # image_name = row[0]
    date = prep_date(row['date'])
    date_time = f"{date} {row['time']}"

    x, y = lngLatToXY(row['longitude'], row['latitude'])

    shape = f"geometry::Point({x}, {y}, 3857)"
    data = {
        "IMAGE_NAME": f"'{row['image_name']}'",
        "LATITUDE": y,
        "LONGITUDE": x,
        # "DATETIME": f"CAST('{row[5]}' as DATETIME)",
        "DATETIME": f"'{date_time}'",

        "SHAPE": shape,
        "SRID": SRID,
    }
    data = {k:str(v) for k,v in data.items()}
    params = ",".join(list(data.keys()))
    vals = ",".join(data.values())
    nearest_id = f"geometry::STGeomFromText('POINT(' + cast({x} as varchar) + ' ' + cast ({y} as varchar) + ')', 3857)"
    query = f"INSERT INTO sdwk.gp_meta ({params}, SW_ID) SELECT TOP(1) {vals}, b.SIDEWALK_ID from sdwk.sidewalks_wm as b order by b.Shape.STDistance({nearest_id})"
    gp_meta.append(query)

def degConverter(d, c):
    deg_whole = float(int(d / 100))
    deg_dec = (d - deg_whole*100) / 60
    deg = deg_whole + deg_dec
    if (c == 'W' or c == 'S'):
        return (-1)*deg
    return deg




cnxn = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER='+SERVER+';DATABASE='+DATABASE+';UID='+USERNAME+';PWD='+ PASSWORD)
cursor = cnxn.cursor()


for query in gp_meta:
  cursor.execute(query)
  cursor.commit()

cursor.close()
cnxn.close()
print("DONE")
