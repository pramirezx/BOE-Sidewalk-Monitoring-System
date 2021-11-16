# Getting the EXIF metadata using the EXIF Python library
from exif import Image

img_path = './code/GPBK1903.jpg'
with open(img_path, 'rb') as src:
    img = Image(src)
    print (src.name, img)


# Open image
import PIL
from PIL import Image as PILImage

image = PILImage.open(img_path)
image


# Checking out if there is any exif metadata available for the picture
if img.has_exif:
    info = f" has the EXIF {img.exif_version}"
else:
    info = "does not contain any EXIF information"
print(f"Image {src.name}: {info}")


# List all tags available on the image
with open(img_path, "rb") as src:
    img = Image(src)
print(img.list_all())
# print(img.pixel_x_dimension)