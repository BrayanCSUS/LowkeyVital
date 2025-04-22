const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

// Load the JSON data
const data = JSON.parse(fs.readFileSync('schedule.json', 'utf-8'));

// Connect to SQLite (will create rooms.db if it doesn't exist)
const db = new sqlite3.Database('rooms.db');

// Create table and insert data
db.serialize(() => {
  // Create the class_schedule table
  db.run(`CREATE TABLE IF NOT EXISTS class_schedule (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    building TEXT,
    room TEXT,
    days TEXT,
    start_time TEXT,
    end_time TEXT
  )`);

  // Prepare insert statement
  const stmt = db.prepare(`
    INSERT INTO class_schedule (building, room, days, start_time, end_time)
    VALUES (?, ?, ?, ?, ?)
  `);

  // Insert each row from JSON
  data.forEach(entry => {
    stmt.run(
      entry.building,
      entry.room,
      entry.days,
      entry.start_time,
      entry.end_time
    );
  });

  stmt.finalize();
  console.log('✅ Data imported into room_finder.db');
});

db.close();
// Note: Make sure to run this script in the same directory as schedule.json
// and room_finder.db will be created in the same directory.