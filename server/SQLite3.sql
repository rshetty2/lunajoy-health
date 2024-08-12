-- SQLite
SELECT id, patient_id, record_date, mood_level, anxiety_level, sleep_hours, sleep_quality, sleep_disturbance, activity_type, activity_duration, social_frequency, stress_level, symptom_type, symptom_level
FROM health;


select * from health where patient_id = 1;

select * from health where record_date = '10/08/2024';