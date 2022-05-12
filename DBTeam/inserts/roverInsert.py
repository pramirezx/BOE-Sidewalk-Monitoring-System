import pandas as pd
import math
import datetime
import pyodbc

#record file of rover data
fileName = '<csv_name>.csv'
#db access/login params
server = '<server>.database.windows.net'
database = '<db_name>'
username = '<username>'
password = '{<passsword>}'   
driver= '{ODBC Driver 17 for SQL Server}'

#splits the raw data gps format into degrees, minutes, seconds
def splitDMS(dms):
    strDMS = str(dms)
    arrDMS = strDMS.split('.')
    seconds = float('.' + arrDMS[1]) * 60
    minutes = int(arrDMS[0][len(arrDMS[0]) - 2:])
    degrees = int(arrDMS[0][:-2])
    return degrees, minutes, seconds

#convert degree minute seconds gps to decimal degrees
def convertDMS(d, m, s):
    dd = d + float(m)/60 + float(s)/3600
    return dd

#convert gps from epsg 4326 to epsg 3857
#input coords in decimal degrees
def convertGPS(lon, lat):
    lon4326 = lon
    lat4326 = lat
    lon3857 = (lon4326 * 20037508.34 / 180)
    lat3857 = (math.log(math.tan((90 + lat4326) * math.pi / 360)) / (math.pi / 180)) * (20037508.34 / 180)
    return lon3857, lat3857

#convert date from rover data for db
def convertDate(date):
    strDate = str(date)
    arrDate = list(strDate)
    #year, month, day
    if len(arrDate) == 5:
        d = datetime.date(2000 + int(arrDate[3] + arrDate[4]), int(arrDate[1] + arrDate[2]), int(arrDate[0]))
    else:
        d = datetime.date(2000 + int(arrDate[4] + arrDate[5]), int(arrDate[2] + arrDate[3]), int(arrDate[0] + arrDate[1]))
    return d

#convert utc time from rover data for db
def convertTime(timeUTC):
    timePST = timeUTC - 80000
    strPST = str(timePST)
    arrPST = list(strPST)
    #hours, minutes, seconds
    if len(arrPST) == 5:
        t = datetime.time(int(arrPST[0]), int(arrPST[1] + arrPST[2]), int(arrPST[3] + arrPST[4]))
    else:
        t = datetime.time(int(arrPST[0] + arrPST[1]), int(arrPST[2] + arrPST[3]), int(arrPST[4] + arrPST[5]))
    return t

#read rover data csv file
df = pd.read_csv(fileName)

#connect to db, read csv, insert data to rover_data table
with pyodbc.connect('DRIVER='+driver+';SERVER=tcp:'+server+';PORT=1433;DATABASE='+database+';UID='+username+';PWD='+ password) as conn:
    with conn.cursor() as cursor:
        for index, row in df.iterrows():
            t = convertTime(df.loc[index, 'UTC'])
            d = convertDate(df.loc[index, 'Date (dd/mm/yy)'])
            latD, latM, latS = splitDMS(df.loc[index, 'Latitude(DDmm.mm)'])
            lonD, lonM, lonS = splitDMS(df.loc[index, 'Longitude(DDmm.mm)'])
            latDD = convertDMS(latD, latM, latS)
            lonDD = convertDMS(lonD, lonM, lonS)
            lon, lat = convertGPS(lonDD, latDD)
            rawGPS = '{0},{1},{2},{3},{4},{5},{6},{7},{8},{9},{10},{11},{12},{13},{14},{15},{16},{17}'.format(df.loc[index, 'Sidewalk ID'],
                df.loc[index, 'NMEA Info'], df.loc[index, 'UTC'], df.loc[index, 'Position status (A=valid data, V= Invalid data)'], df.loc[index, 'Latitude(DDmm.mm)'],
                df.loc[index, 'Latitude Dir (N=North, S = South)'], df.loc[index, 'Longitude(DDmm.mm)'], df.loc[index, 'Longitude Dir (E=East, W =West)'], df.loc[index, 'Speed over ground'],
                df.loc[index, 'Track'], df.loc[index, 'Date (dd/mm/yy)'], df.loc[index, 'Magnetic Variation'], df.loc[index, 'Variation Direction'], df.loc[index, 'Mod ind + Check sum'],
                df.loc[index, 'RunningSlope (X - Axis)'], df.loc[index, 'CrossingSlope (Y-axis)'], df.loc[index, 'X-Axis Temp'], df.loc[index, 'Y-Axis Temp'])
            cursor.execute("INSERT INTO [sdwk].[rover_data] (INPUT_SW_ID, RAW_GPS, LATITUDE, LONGITUDE, DATE, SLOPE_X, SLOPE_Y, RECORD_FILE, SRID, TIME, X_AXIS_TEMP, Y_AXIS_TEMP, SPEED) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
                           int(df.loc[index, 'Sidewalk ID']), rawGPS, lat, -lon, d, df.loc[index, 'RunningSlope (X - Axis)'], df.loc[index, 'CrossingSlope (Y-axis)'], fileName, 3857, t, df.loc[index, 'X-Axis Temp'], df.loc[index, 'Y-Axis Temp'], df.loc[index, 'Speed over ground'])
        cursor.execute("UPDATE [sdwk].[rover_data] SET [SHAPE] = geometry::Point(LONGITUDE, LATITUDE, 0) WHERE RECORD_FILE = ?;", fileName)
        cursor.execute("UPDATE [sdwk].[rover_data] SET [PERCENT_X] = tan(radians(abs(SLOPE_X)))*100 WHERE RECORD_FILE = ?;", fileName)
        cursor.execute("UPDATE [sdwk].[rover_data] SET [PERCENT_Y] = tan(radians(abs(SLOPE_Y)))*100 WHERE RECORD_FILE = ?;", fileName)
