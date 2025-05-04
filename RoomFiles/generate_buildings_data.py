import pandas as pd
import json
import os

df = pd.read_csv('class_schedule_clean.csv')

# Generate building data for frontend
def generate_building_data(df):
    # Drop duplicates to ensure one name per building
    building_names = df[['code', 'building']].drop_duplicates().set_index('code')

    # Count unique rooms per building
    grouped = df.groupby("code").agg(
        rooms=('room', lambda x: len(set(x)))
    ).reset_index()

    # Get image path for each building - uses 'building'.jpg if it exists, otherwise uses a placeholder
    def get_image_path(building_code, image_dir="../SacStateRoomReservation/public/images"):
        # Check if the image exists in the specified directory
        filename = f"{building_code}.jpg"
        filepath = os.path.join(image_dir, filename)
        if os.path.exists(filepath):
            return f"/images/{filename}?height=200&width=300"
        return "/images/placeholder.jpg?height=200&width=300"



    # Add building names from the CSV
    grouped["name"] = grouped["code"].map(building_names["building"])
    grouped["id"] = range(1, len(grouped) + 1)
    grouped["floors"] = 3   # Filler data, no data in CSV
    grouped["availableRooms"] = 0  # Optional: can be filled from logic
    grouped["hours"] = "7:00 AM - 10:00 PM" # Filler data, no data in CSV
    grouped["features"] = [["Classrooms"]] * len(grouped)
    grouped["image"] = grouped["code"].apply(get_image_path)

    return grouped.to_dict(orient="records")

building_data = generate_building_data(df)

with open("../SacStateRoomReservation/public/data/buildings_data.json", "w") as f:
    json.dump(building_data, f, indent=2)