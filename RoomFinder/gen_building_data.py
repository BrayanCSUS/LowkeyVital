import pandas as pd
import json # to generate building data for frontend

df = pd.read_csv('class_schedule_clean.csv')

# Generate building data for frontend
def generate_building_data(df):
    # Drop duplicates to ensure one name per building
    building_names = df[['building', 'building_name']].drop_duplicates().set_index('building')

    # Count unique rooms per building
    grouped = df.groupby("building").agg(
        rooms=('room', lambda x: len(set(x)))
    ).reset_index()

    # Add building names from the CSV
    grouped["name"] = grouped["building"].map(building_names["building_name"])

    grouped["id"] = range(1, len(grouped) + 1)
    grouped["floors"] = 3
    grouped["availableRooms"] = 0  # Optional: can be filled from logic
    grouped["hours"] = "7:00 AM - 10:00 PM"
    grouped["features"] = [["Classrooms"]] * len(grouped)
    grouped["image"] = "/placeholder.jpg?height=200&width=300"

    return grouped.to_dict(orient="records")

building_data = generate_building_data(df)

with open("../SacStateRoomReservation/public/data/buildings_data.json", "w") as f:
    json.dump(building_data, f, indent=2)