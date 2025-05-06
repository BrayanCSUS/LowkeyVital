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
    def get_image_path(building_name, image_dir="../SacStateRoomReservation/public/images"):
        # Remove spaces from the building name
        sanitized_building_name = building_name.replace(" ", "")
        # Construct the filename
        filename = f"{sanitized_building_name}.jpg"
        # Check if the image exists in the specified directory
        filepath = os.path.join(image_dir, filename)
        if os.path.exists(filepath):
            return f"/images/{filename}?height=200&width=300"
        return "/images/placeholder.jpg?height=200&width=300"
    

    # Add building names from the CSV
    grouped["name"] = grouped["code"].map(building_names["building"])
    grouped["id"] = range(1, len(grouped) + 1)
    grouped["floors"] = 3   # Filler data, no data in CSV
    grouped["totalRooms"] = grouped["rooms"]  # Optional: can be filled from logic
    grouped["hours"] = "8:00 AM - 8:00 PM" # Filler data, no data in CSV
    grouped["features"] = [["Classrooms"]] * len(grouped)
    grouped["image"] = grouped["name"].apply(lambda name: get_image_path(name))

    return grouped.to_dict(orient="records")

building_data = generate_building_data(df)

with open("../SacStateRoomReservation/public/data/buildings_data.json", "w") as f:
    json.dump(building_data, f, indent=2)