Running `index.js` should start the server. It is advise to configure using something like `pm2` to offer persistency.

Edit the database access configuration in the `example.env` file and rename the file to `.env` to run.

-----------------------------------------------------------------------------------------------------------------------------
DB Inserts
GoPro Camera Data Upload: have the python script in the same folder as the GoPro metadata CSV files in order to run the script to upload to DB
GoPro CSV column headers are as follows: image_name,	date,	time,	latitude,	latref,	longitude,	lonref,	lat_degrees,	lat_minutes,	lat_seconds,	lon_degrees,	lon_minutes,	lon_seconds
Rover Data Upload: similar to the above script, have it in the folder containing the rover data CSV files in order to run to upload to DB
Rover Data column headers are as follows: Sidewalk ID,	NMEA Info,	UTC,	Position status (A=valid data, V= Invalid data),	Latitude(DDmm.mm),	Latitude Dir (N=North, S = South),	Longitude(DDmm.mm),	Longitude Dir (E=East, W =West),	Speed over ground,	Track,	Date (dd/mm/yy),	Magnetic Variation,	Variation Direction,	Mod ind + Check sum,	RunningSlope (X - Axis),	CrossingSlope (Y-axis),	X-Axis Temp,	Y-Axis Temp

Rover data will generate many CSV files, if needed these files can be combined into one as the data upload is manual for each CSV file:
In cmd navigate to the directory with all the generate CSV files. Then run the following command: copy *.csv <new_csv_name>.csv
