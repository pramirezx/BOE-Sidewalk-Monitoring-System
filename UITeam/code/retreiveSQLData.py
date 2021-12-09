import pyodbc
import pandas as pd

def handle_sql_variant_as_string(value):
    return value.decode('ISO-8859-1')

# Use SELECT @@SERVERNAME to check server name on SQL Server
con = pyodbc.connect("Driver={ODBC Driver 17 for SQL Server};"
                        "Server=engswbotdbserver.database.windows.net;"
                        "Database=SWBot;"
                        "uid=swbotguest; pwd=Soundwave12#$;"
                    )

cursor = con.cursor()
con.add_output_converter(-151, handle_sql_variant_as_string)
cursor.execute('SELECT [ID]'
      ',[INPUT_SW_ID]'
      ',[RAW_GPS]'
      ',[LATITUDE]'
      ',[LONGITUDE]'
      ',[DATE]'
      ',[SLOPE_X]'
      ',[SLOPE_Y]'
      ',[RECORD_FILE]'
      ',[SRID] FROM [sdwk].[rover_data]')

for row in cursor:
    id = row[0]
    input_sw_id = row[1]
    raw_gps = row[2]
    latitude = row[3]
    longitude = row[4]
    date = row[5]
    slope_x = row[6]
    slope_y = row[7]
    record_file = row[8]
    srid = row[9]
    # print('row = %r' % (row,))