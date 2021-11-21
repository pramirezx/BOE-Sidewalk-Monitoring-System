import pyodbc
import pandas as pd

# Use SELECT @@SERVERNAME to check server name on SQL Server
con = pyodbc.connect("Driver={ODBC Driver 17 for SQL Server};"
                        "Server=engswbotdbserver.database.windows.net;"
                        "Database=SWBot;"
                        "uid=swbotguest; pwd=Soundwave12#$;"
                    )

cursor = con.cursor()
cursor.execute('SELECT * FROM [dbo].[RoverData]')

for row in cursor:
    rawGPS = row[0]
    timeStamps = row[1]
    latitude = row[2]
    latitudeREF = row[3]
    longitude = row[4]
    longitudeREF = row[5]
    xSlope = row[6]
    ySlope = row[7]
    angle = row[8]
    pinID = row[9]
    imageURL = row[10]
    print('row = %r' % (row,))