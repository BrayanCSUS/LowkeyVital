import pandas as pd
import datetime
import json
import re

# Read the CSV file
df = pd.read_csv('class_schedule_clean.csv')


# Process days column - expand days like "TR" into separate rows
def expand_days(days_str):
    days_str = str(days_str)
    return [d for d in re.findall('[MTWRF]', days_str)]


df['days_list'] = df['days'].apply(expand_days)
df = df.explode('days_list')

# Map abbreviations to full day names
day_mapping = {
    'M': 'Monday',
    'T': 'Tuesday',
    'W': 'Wednesday',
    'R': 'Thursday',
    'F': 'Friday'
}
df['day'] = df['days_list'].map(day_mapping)


# Convert military time to datetime objects
def convert_military_to_time(time_val):
    time_str = str(time_val).zfill(4)
    hours = int(time_str[:2])
    minutes = int(time_str[2:])
    return datetime.time(hours, minutes)


df['start_time'] = df['start'].apply(convert_military_to_time)
df['end_time'] = df['end'].apply(convert_military_to_time)

# Define the day start and end times
day_start = datetime.time(7, 0)  # 7:00 AM
day_end = datetime.time(22, 0)  # 10:00 PM


# Function to calculate time difference in minutes
def time_diff_minutes(time1, time2):
    t1 = datetime.timedelta(hours=time1.hour, minutes=time1.minute)
    t2 = datetime.timedelta(hours=time2.hour, minutes=time2.minute)
    diff = t2 - t1
    return diff.total_seconds() / 60


# Group by building, room, and day
grouped = df.groupby(['building', 'room', 'day'])

# Dictionary to store availability
availability = {}

for (building, room, day), group in grouped:
    # Sort by start time
    group = group.sort_values('start_time')

    # Initialize structure in the dictionary
    if building not in availability:
        availability[building] = {}
    if room not in availability[building]:
        availability[building][room] = {}
    if day not in availability[building][room]:
        availability[building][room][day] = []

    # Collect booked slots
    booked_slots = []
    for _, row in group.iterrows():
        booked_slots.append({
            'start': row['start_time'],
            'end': row['end_time']
        })

    # Find available time slots (no need to check for overlaps)
    if booked_slots:
        booked_slots.sort(key=lambda x: x['start'])

        # Check for gap before first meeting
        if time_diff_minutes(day_start, booked_slots[0]['start']) > 15:
            availability[building][room][day].append({
                'start': day_start.strftime('%H:%M'),
                'end': booked_slots[0]['start'].strftime('%H:%M')
            })

        # Find gaps between meetings
        for i in range(len(booked_slots) - 1):
            current_end = booked_slots[i]['end']
            next_start = booked_slots[i + 1]['start']

            # Only include gaps greater than 15 minutes
            if time_diff_minutes(current_end, next_start) > 15:
                availability[building][room][day].append({
                    'start': current_end.strftime('%H:%M'),
                    'end': next_start.strftime('%H:%M')
                })

        # Check for gap after last meeting
        if time_diff_minutes(booked_slots[-1]['end'], day_end) > 15:
            availability[building][room][day].append({
                'start': booked_slots[-1]['end'].strftime('%H:%M'),
                'end': day_end.strftime('%H:%M')
            })
    else:
        # If no meetings all day, room is available all day
        availability[building][room][day].append({
            'start': day_start.strftime('%H:%M'),
            'end': day_end.strftime('%H:%M')
        })

# Export to JSON
with open('room_availability.json', 'w') as f:
    json.dump(availability, f, indent=2)
