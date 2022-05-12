import pandas as pd
import math
from datetime import datetime
import pyodbc

#db access/login params
server = '<server>.database.windows.net'
database = '<db_name>'
username = '<username>'
password = '{<passsword>}'   
driver= '{ODBC Driver 17 for SQL Server}'

#convert gps from epsg 4326 to epsg 3857
#input coords in decimal degrees
def convertGPS(lon, lat):
    lon3857 = (lon * 20037508.34 / 180)
    lat3857 = (math.log(math.tan((90 + lat) * math.pi / 360)) / (math.pi / 180)) * (20037508.34 / 180)
    return lon3857, lat3857

#convert date and time from metadata to smalldatetime for db
def convertDateTime(date, time):
    arrDate = date.split('/')
    arrTime = time.split(':')
    #year, month, day, hours, minutes, seconds
    dt = datetime(int(arrDate[2]), int(arrDate[0]), int(arrDate[1]), int(arrTime[0]), int(arrTime[1]), int(arrTime[2]))
    return dt

#read gopro metadata csv file
df = pd.read_csv("<csv_name>.csv")

#connect to db, read csv, insert data to gp_meta table
with pyodbc.connect('DRIVER='+driver+';SERVER=tcp:'+server+';PORT=1433;DATABASE='+database+';UID='+username+';PWD='+ password) as conn:
    with conn.cursor() as cursor:
        for index, row in df.iterrows():
            lon, lat = convertGPS(df.loc[index, 'longitude'], df.loc[index, 'latitude'])
            dt = convertDateTime(df.loc[index, 'date'], df.loc[index, 'time'])
            cursor.execute("INSERT INTO [sdwk].[gp_meta] (IMAGE_NAME, LATITUDE, LONGITUDE, DATETIME, ROVER_SW_ID, SRID) VALUES (?, ?, ?, ?, ?, ?);",
                           df.loc[index, 'image_name'], lat, -lon, dt, 123, 3857)
            cursor.execute("UPDATE [sdwk].[gp_meta] SET [SHAPE] = geometry::Point(LONGITUDE, LATITUDE, 3857) WHERE IMAGE_NAME = ?;", df.loc[index, 'image_name'])
            cursor.execute("UPDATE [sdwk].[gp_meta] SET [SW_ID] = (SELECT TOP 1 SIDEWALK_ID FROM [sdwk].[sidewalks_wm] AS b ORDER BY b.Shape.STDistance(geometry::STGeomFromText('POINT(' + cast(? as varchar) + ' ' + cast(? as varchar) + ')', 3857))) WHERE IMAGE_NAME = ?;",
                           -lon, lat, df.loc[index, 'image_name'])
