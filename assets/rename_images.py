import os
import re

def strip_non_numbers_from_filenames(directory):
    # Check if the directory exists
    if not os.path.isdir(directory):
        print(f"The directory {directory} does not exist.")
        return

    # Iterate over all files in the directory
    for filename in os.listdir(directory):
        # Check if the file is a PNG file
        if filename.endswith(".png"):
            # Extract the numeric part of the filename
            new_filename = re.sub(r'\D+', '', filename.split('.')[0]) + ".png"
            # Construct full file paths
            old_file = os.path.join(directory, filename)
            new_file = os.path.join(directory, new_filename)
            # Rename the file
            os.rename(old_file, new_file)
            print(f"Renamed {old_file} to {new_file}")

if __name__ == "__main__":
    # Input the directory path
    directory = input("Enter the directory path: ")
    strip_non_numbers_from_filenames(directory)