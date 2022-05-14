import pandas as pd
import glob
import os
import math
import pyodbc
from itertools import groupby
import datetime
import time


# This script basically works only on unmodified rover CSVs and
# as you can see from the code it will process all CSVs in the temp folder
# and process it. This does not have a function to delete the files after
# or check if the data has already been uploaded. This script was originally
# designed to manage rover data manually and was not built to be used by NodeJS.
# The implementation is very ad hoc and doesn't have too many test cases in mind.
SERVER = 'ENTER SERVER'
DATABASE = 'DATABASE NAME'
USERNAME = 'USERNAME'
PASSWORD = 'PASSWORD'

SRID = 3857
path = "./"
extension = 'csv'
csv_files = glob.glob("temp/*.{}".format(extension))
rover_csv = [file for file in csv_files if file.find("slope_data") != -1]
def degConverter(d, c):
    deg_whole = float(int(d / 100))
    deg_dec = (d - deg_whole*100) / 60
    deg = deg_whole + deg_dec
    if (c == 'W' or c == 'S'):
        return (-1)*deg
    return deg
SEMI_MAJOR_AXIS = 6378137
HALF_SM_AXIS = SEMI_MAJOR_AXIS / 2
def lngLatToXY(lng, lat):
    x = 0.017453292519943 * lng * SEMI_MAJOR_AXIS
    y = lat * 0.017453292519943
    y = HALF_SM_AXIS * math.log((1 + math.sin(y)) / (1 - math.sin(y)))
    return (x,y)
def rover_str(rov):
    params = ",".join(list(rov.keys()))
    query = f"insert into sdwk.rover_data ({params}) values ({','.join(['?' for _ in range(len(rov.keys()))])})"
    return query
def to_poly_text(coordinates):
    # cleaned = [x for x, _ in groupby(coordinates)]
    # txt = [" ".join(map(str,coord)) for coord in cleaned]
    txt = [" ".join(map(str,coord)) for coord in coordinates]

    txt.append(txt[0])
    return ", ".join(txt)
def poly_insert(input_sid, record_file, text, srid=SRID):
    geo = f"geometry::STGeomFromText('POLYGON(({text}))', {srid})"
    insert_query = f"INSERT INTO sdwk.rover_sw (INPUT_SW_ID, RECORD_FILE, SHAPE, SRID) VALUES ({input_sid},'{record_file}', {geo}, {srid})"
    return insert_query



for csv_file in rover_csv:
    df = pd.read_csv(f"./{csv_file}")
    inserts = []
    coords = []
    for i, row in df.iterrows():
        print(f"Working on csv: {csv_file}")
        cur_lat = row[4]
        NS = row[5].strip()
        EW = row[7].strip()
        cur_lon = row[6]
        checksum = row[13]
        lat_deg = degConverter(cur_lat, NS)
        lon_deg = degConverter(cur_lon, EW)

        d = str(row[10])
        if (len(d) != 6):
            d = "0" + d
        x, y = lngLatToXY(lon_deg, lat_deg)


        shape = f"POINT({x} {y} {SRID})"

        insert = {
            'INPUT_SW_ID': int(row[0]),
            "RAW_GPS": ",".join(map(str,row)),
            "LATITUDE": y,
            "LONGITUDE": x,
            "DATE": f"20{d[4:]}-{d[2:4]}-{d[:2]}",
            "SLOPE_X": row[-4],
            "SLOPE_Y": row[-3],
            "SHAPE": shape,
            "RECORD_FILE": csv_file,
            "SRID": SRID,
            "X_AXIS_TEMP": row[-2],
            "Y_AXIS_TEMP": row[-1],
            "SPEED": row[8],
            # "TIME": int(row[2])
            "TIME": time.strftime("%H:%M:%S",time.gmtime(row[2]))
        }
        print(insert["TIME"])
        print(f"20{d[4:]}-{d[2:4]}-{d[:2]}")
        coords.append((x,y))
        inserts.append(insert)


    cnxn = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER='+SERVER+';DATABASE='+DATABASE+';UID='+USERNAME+';PWD='+ PASSWORD)
    cursor = cnxn.cursor()

    if len(inserts) < 1:
        print(f"this csv has no items: {csv_file}")
    else:
        rover_insert_query = rover_str(inserts[0])
        print(rover_insert_query)
        rover_insert_params = [tuple(p.values()) for p in inserts]
        print(rover_insert_params[0])
        cursor.executemany(rover_insert_query, rover_insert_params)
        cursor.commit()
        cursor.close()
        cnxn.close()        

