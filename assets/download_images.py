import os
import requests

def download_images(max_number=1025, output_folder='images'):
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    base_url = "https://serebii.net/Shiny/SV/new/"
    failed_downloads = []

    for i in range(1, max_number + 1):
        image_url = f"{base_url}{str(i).zfill(3)}.png"
        response = requests.get(image_url)
        if response.status_code == 200:
            with open(os.path.join(output_folder, f"{str(i).zfill(3)}.png"), 'wb') as file:
                file.write(response.content)
            print(f"Downloaded: {image_url}")
        else:
            print(f"Failed to download: {image_url}")
            failed_downloads.append(image_url)

    if failed_downloads:
        print("\nThe following images failed to download:")
        for url in failed_downloads:
            print(url)
        input("\nPress Enter to exit...")

if __name__ == "__main__":
    max_number = int(input("Enter the max number of images to download: "))
    output_folder = input("Enter the output folder for the downloaded images: ")
    download_images(max_number, output_folder)