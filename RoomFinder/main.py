import pandas as pd
from utils import find_empty_rooms

df = pd.read_csv('class_schedule_clean.csv')
days = "MTWRF"

day_input = input("Enter a day (M T W R F): ")
day_to_check = day_input.upper()
if day_to_check not in days:
    exit("Error")
min_gap = int(input("Enter minimum gap (in minutes): "))
if min_gap > 720:
    exit("Error")


availability = find_empty_rooms(df, day_to_check, min_gap)

print(f"\nCompletely empty rooms on {day_to_check}:")
for room in availability['empty_rooms']:
    print(f"  {room['building']} {room['room']} (available all day)")

print(f"\nRooms with available time slots:")
for room, slots in availability['partial_rooms'].items():
    print(f"  {room}:")
    for start, end in slots:
        print(f"    {start} - {end}")
