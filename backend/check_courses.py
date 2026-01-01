import sqlite3
import json

conn = sqlite3.connect('mondev.db')
cursor = conn.cursor()

try:
    cursor.execute("SELECT id, title, is_published FROM courses")
    rows = cursor.fetchall()
    results = []
    for row in rows:
        results.append({
            "id": row[0],
            "title": row[1],
            "is_published": bool(row[2])
        })
    print(json.dumps(results, indent=2))
except Exception as e:
    print(f"Error: {e}")
finally:
    conn.close()
