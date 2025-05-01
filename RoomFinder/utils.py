def time_difference(start, end):
    start_h, start_m = divmod(start, 100)
    end_h, end_m = divmod(end, 100)
    return (end_h - start_h) * 60 + (end_m - start_m)


def find_empty_rooms(df, target_day, min_gap, business_start=800, business_end=2000):
    all_rooms = set(zip(df['building'], df['room']))
    meetings_on_day = df[df['days'].str.contains(target_day)]
    rooms_with_meetings = set(zip(meetings_on_day['building'], meetings_on_day['room']))
    empty_rooms = all_rooms - rooms_with_meetings
    empty_rooms_list = [{'building': b, 'room': r} for b, r in sorted(empty_rooms)]
    partial_rooms = {}

    for building, room_number in sorted(rooms_with_meetings):
        room_id = f"{building}-{room_number}"
        room_meetings = meetings_on_day[
            (meetings_on_day['building'] == building) &
            (meetings_on_day['room'] == room_number)
        ]
        busy_times = []
        for _, meeting in room_meetings.iterrows():
            busy_times.append((int(meeting['start']), int(meeting['end'])))
        busy_times.sort()
        free_times = []
        current_time = business_start
        for start, end in busy_times:
            if current_time < start:
                gap_minutes = time_difference(current_time, start)
                if gap_minutes > min_gap:
                    free_times.append((current_time, start))
            current_time = max(current_time, end)
        if current_time < business_end:
            gap_minutes = time_difference(current_time, business_end)
            if gap_minutes > min_gap:
                free_times.append((current_time, business_end))
        if free_times:
            partial_rooms[room_id] = free_times

    return {
        'empty_rooms': empty_rooms_list,
        'partial_rooms': partial_rooms
    }