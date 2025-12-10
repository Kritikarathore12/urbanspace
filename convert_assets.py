import os
from PIL import Image
import shutil

source_dir = r"c:\Users\vidit shrama\Desktop\kritika\extracted_images"
dest_dir = r"c:\Users\vidit shrama\Desktop\kritika\portfolio-cms\client\public\assets"

if not os.path.exists(dest_dir):
    os.makedirs(dest_dir)

valid_extensions = {'.png', '.jpg', '.jpeg', '.webp', '.jp2'}

for filename in os.listdir(source_dir):
    ext = os.path.splitext(filename)[1].lower()
    if ext in valid_extensions:
        filepath = os.path.join(source_dir, filename)
        dest_filename = os.path.splitext(filename)[0] + ".png" # Convert all to PNG
        dest_path = os.path.join(dest_dir, dest_filename)
        
        try:
            with Image.open(filepath) as img:
                img.save(dest_path, "PNG")
                print(f"Converted and saved: {dest_filename}")
        except Exception as e:
            print(f"Failed to convert {filename}: {e}")
