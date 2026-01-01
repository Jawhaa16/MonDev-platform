import sqlite3
import json

conn = sqlite3.connect('mondev.db')
cursor = conn.cursor()

try:
    cursor.execute("SELECT * FROM videos")
    rows = cursor.fetchall()
    columns = [description[0] for description in cursor.description]
    results = []
    for row in rows:
        results.append(dict(zip(columns, row)))
    print(json.dumps(results, indent=2))
except Exception as e:
    print(f"Error: {e}")
finally:
    conn.close()
