from azure.storage.blob import BlockBlobService
from PIL import Image
import datetime
import exifread
import csv
import io

# Get Azure Blob Server Information
block_blob_service = BlockBlobService(account_name='swbotblob', sas_token='sv=2019-10-10&si=csulaswproject-17C19A6298B&sr=c&sig=xZ2soDIU1tHpJVeQVKnAYykG32Sggh3C5xNTnv1%2FB6Y%3D')
generator = block_blob_service.list_blobs('csulaswproject', 'images')

# Convert exif data to degree
def toDegree(data):
        l = list((str(data).replace('[', '')).replace(']', '').split(','))
        s = l[2].split('/')
        return float(l[0]) + (1/60)*float(l[1]) + (float(s[0])/float(s[1]))*(1/(60*60))

# Open or create csv file
f = open('./data/GoProMetadata.csv', 'w', encoding='UTF8', newline='')

# Create a wirter to write onto the csv file
writer = csv.writer(f)

# Write the header onto the csv file
header = ['image_name','date','time','latitude','latref','longitude','lonref','lat_degrees','lat_minutes','lat_seconds','lon_degrees','lon_minutes','lon_seconds']
writer.writerow(header)

# Loops through all images located in the blob server directory
for blob in generator:
    # Open current image in the directory
    b = block_blob_service.get_blob_to_bytes('csulaswproject', blob.name)
    image_file_in_mem = io.BytesIO(b.content)

    # Reads all metadata located within the exif file
    tags = exifread.process_file(image_file_in_mem)

    # Extract image name
    img_name = b.name.split('/')[-1]

    # Extract image gps data
    latref = tags.get('GPS GPSLatitudeRef')
    lat = toDegree(tags.get('GPS GPSLatitude'))
    lonref = tags.get('GPS GPSLongitudeRef')
    lon = toDegree(tags.get('GPS GPSLongitude'))
    imake = tags.get('Image Make')

    # Extract date and time data from the current exif image file
    imageTime = datetime.datetime.strptime(str(tags.get('Image DateTime')), '%Y:%m:%d %H:%M:%S')
    date, time = str(imageTime).split(' ') 

    # Extract and convert Degree, Minute and Second of the exif image file
    lat_deg, lat_min, lat_sec = str(tags.get('GPS GPSLatitude'))[1:-1].split(', ')
    lat_sec_num1, lat_sec_num2 = lat_sec.split('/')
    lat_sec = float(lat_sec_num1)/float(lat_sec_num2)

    lon_deg, lon_min, lon_sec = str(tags.get('GPS GPSLongitude'))[1:-1].split(', ')
    lon_sec_num1, lon_sec_num2 = lon_sec.split('/')
    lon_sec = float(lon_sec_num1)/float(lon_sec_num2)

    # Group all metadata into a list
    data = [img_name,date,time,lat,latref,lon,lonref,lat_deg,lat_min,lat_sec,lon_deg,lon_min,lon_sec]

    # Write the data onto the file
    writer.writerow(data)

# Close the file
f.close()