const sqlite3 = require('sqlite3').verbose();

// Open a database file or create it if it doesn't exist
let db = new sqlite3.Database('health.db', (err) => {
  if (err) {
    console.error('Could not connect to database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS health (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      patient_id INTEGER NOT NULL,
      record_date DATE NOT NULL,
      mood_level INTEGER NOT NULL,
      anxiety_level INTEGER NOT NULL,
      sleep_hours INTEGER NOT NULL,
      sleep_quality INTEGER NOT NULL,
      sleep_disturbance CHAR NOT NULL,
      activity_type TEXT NOT NULL,
      activity_duration INTEGER NOT NULL,
      social_frequency INTEGER NOT NULL,
      stress_level INTEGER NOT NULL,
      symptom_type TEXT,
      symptom_level INTEGER
    )`);
  
    // Insert some data if no data present
    // let stmt = db.prepare("INSERT INTO health (patient_id,record_date,mood_level,anxiety_level,sleep_hours,sleep_quality,sleep_disturbance,activity_type,activity_duration,social_frequency,stress_level,symptom_type,symptom_level) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)");
    // stmt.run(1, '10/08/2024', 5, 4, 8.5, 5, 'Y', 'Run',1,4,7,'Headache',9);
    // stmt.run(2, '09/08/2024', 5, 7, 5.5, 2, 'Y', 'Jog',1,4,7,'Headache',9);
    //stmt.finalize();
  });


  
  // Close the database connection
  db.close((err) => {
    if (err) {
      console.error('Error closing database connection:', err.message);
    } else {
      console.log('Database connection closed.');
    }
  });
  