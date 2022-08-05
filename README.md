# BOE-Sidewalk-Monitoring-System

## DB/Backend ##

Running `index.js` should start the server. It is advise to configure using something like `pm2` to offer persistency.

Edit the database access configuration in the `example.env` file and rename the file to `.env` to run.

GoPro Camera Data Upload: have the python script in the same folder as the GoPro metadata CSV files in order to run the script to upload to DB. DB access parameters need to be edited.

GoPro CSV column headers are as follows: image_name,	date,	time,	latitude,	latref,	longitude,	lonref,	lat_degrees,	lat_minutes,	lat_seconds,	lon_degrees,	lon_minutes,	lon_seconds


Rover Data Upload: similar to the above script, have it in the folder containing the rover data CSV files in order to run to upload to DB. DB access parameters and the csv file name parameter need to be edited.

Rover Data column headers are as follows: Sidewalk ID,	NMEA Info,	UTC,	Position status (A=valid data, V= Invalid data),	Latitude(DDmm.mm),	Latitude Dir (N=North, S = South),	Longitude(DDmm.mm),	Longitude Dir (E=East, W =West),	Speed over ground,	Track,	Date (dd/mm/yy),	Magnetic Variation,	Variation Direction,	Mod ind + Check sum,	RunningSlope (X - Axis),	CrossingSlope (Y-axis),	X-Axis Temp,	Y-Axis Temp


Rover data will generate many CSV files, if needed these files can be combined into one as the data upload is manual for each CSV file.
In cmd navigate to the directory with all the generated CSV files. Then run the following command: copy *.csv <new_csv_name>.csv


## Web UI Team ##

UI Team's main task is to be able to develop an interactive user-friendly UI that is able to display specific or individual sidewalk segment images and its slope data. 

To run the React App:
1. Run a new terminal
2. Go to BOESidewalkProject-ReactApp directory
3. Run the command: **npm install**

**Note:** The following dependencies must also be installed using the "npm install ..." command
<br> "@azure/storage-blob": "^12.9.0",
<br> "axios": "^0.26.0",
<br> "google-maps-react": "^2.0.6",
<br> "react": "^17.0.2",
<br> "react-csv": "^2.2.2",
<br> "react-dom": "^17.0.2",
<br> "react-icons": "^4.3.1",
<br> "react-photosphere": "^1.0.2",
<br> "react-router-dom": "^6.2.1",
<br> "react-scripts": "5.0.0"

4. Replace the "apiKey:" in line 82 of the MapContainer.js file with a usable Google Maps API key.
5. Then run the command: **npm start**

To extract data from GoPro images: 
1. Use the exifDataExtract.py file. 
2. In line 9, add the SAS token key.
3. In line 10, replace the 'images_3_1' with the preferred image folder from blob storage.
4. In line 19, choose the destination you want the csv file to be in or create the csv file.
    
To extract data from SQL database:
1. Use the retreiveSQLData.py file

Note:
- The data file displays all the extracted data from exifDataExtract.py
- images file displays all the images from the GoPro (you can find the images also in the Azure Blob Storage).

## Mobile UI ##
# leo_ui

The repository contains User Interface as the default available on LeoOS.

The main functionalities include:
- steering the robot
- streaming the camera image
- reading battery voltage
- rebooting and shutting down
- setting position on the servos connected to [hServo] ports

### User Interface Communication

Comunnication betwen UI and ROS layer is provided by WebSockets. The UI uses JavaScript library called [roslibjs] to establish connection with [rosbridge] and provides publishing, subscribing, service calls and other essential ROS functionality.

Camera real-time view build-in UI is available through the web_video_server running as the default on LeoOS. The [web video server] package transform ROS image topic that can be accessed via HTTP.

![alt text][architecture]

### LeoOS default setup

As a default UI is hosted by the 'nginx' server installed on LeoRovers. To open UI use any Web browser and type your Rover IP address. In the case of connecting directly to the access point, the IP address is '10.0.0.1'

### UI development

The User Interface folder in LeoOS file system is placed in '/opt/leo_ui' folder. If you would like to make some changes to the default UI you can edit files directly in that folder.

#### Before editing the UI code, read about ;-)
- [Bootstrap]
- [roslibjs]

[architecture]: docs/architecture.png 

[hServo]: https://app.gitbook.com/@leorover/s/leorover/integrations/digital-servos-up-to-3

[roslibjs]: http://wiki.ros.org/roslibjs

[rosbridge]: http://wiki.ros.org/rosbridge_suite

[web video server]: http://wiki.ros.org/web_video_server

[Bootstrap]: https://getbootstrap.com/docs/5.0/getting-started/introduction/
