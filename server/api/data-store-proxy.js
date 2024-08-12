const sqlite3 = require('sqlite3').verbose();




let db = new sqlite3.Database('./health.db', (err) => {
    if (err) {
      console.error('Could not connect to database:', err.message);
    } else {
      console.log('Connected to the SQLite database.');
    }
  });

  
   
function saveHealth(userdata) {
    
    let stmt = db.prepare("INSERT INTO health (patient_id,record_date,mood_level,anxiety_level,sleep_hours, \
        sleep_quality,sleep_disturbance,activity_type,activity_duration,social_frequency,stress_level,symptom_type, \
        symptom_level) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)");

    stmt.run(
        userdata["patient_id"],userdata["record_Date"], userdata["mood_level"], 
        userdata["anxiety_level"], userdata["sleep_hours"], userdata["sleep_quality"], 
        userdata["sleep_disturbance"], userdata["activity_type"], userdata["activity_duration"], 
        userdata["social_frequency"], userdata["stress_level"], userdata["symptom_type"],
        userdata["symptom_level"]
    );
    return stmt.finalize();
  }

  const getAll = (callback) => {
        db.all('select * from health', [], (err,rows) => {
            if(err) {
                console.error('Error querying database:', err.message);
                callback(err,null);
            } else {
                console.log('REACHED getAll %d, count = %d', rows[0]["patient_id"], rows.length);
                callback(null,rows);
            }
        });
}; 
  
module.exports = {saveHealth, getAll};
