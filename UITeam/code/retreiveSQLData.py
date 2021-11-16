import pyodbc
import pandas as pd

# Use SELECT @@SERVERNAME to check server name on SQL Server
con = pyodbc.connect("Driver={ODBC Driver 17 for SQL Server};"
                        "Server=engswbotdbserver.database.windows.net;"
                        "Database=SWBot;"
                        "uid=swbotguest; pwd=Soundwave12#$;"
                        # "Trusted_Connection=yes;"
                    )

# driver_name = ''
# driver_names = [x for x in pyodbc.drivers() if x.endswith(' for SQL Server')]
# if driver_names:
#     driver_name = driver_names[0]
# if driver_name:
#     conn_str = 'DRIVER={};'.format(driver_name)
#     # then continue with ...
#     # pyodbc.connect(conn_str)
#     # ... etc.
# else:
#     print('(No suitable driver found. Cannot connect.)')

cursor = con.cursor()
cursor.execute('SELECT * FROM [dbo].[RoverData]')
# df = pd.read_sql_query('SELECT * FROM [dbo].[RoverData]', con)

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
# print(df)
# print(type(df))