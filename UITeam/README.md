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
1. Use the exifDataExtract.py file 
2. In line 10, replace the 'images_3_1' with the preferred image folder from blob storage
3. In line 19, choose the destination you want the csv file to be in or create the csv file
    
To extract data from SQL database:
1. Use the retreiveSQLData.py file

Note:
- The data file displays all the extracted data from exifDataExtract.py
- images file displays all the images from the GoPro (you can find the images also in the Azure Blob Storage).
