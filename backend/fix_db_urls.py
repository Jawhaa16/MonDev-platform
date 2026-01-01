import sqlite3

conn = sqlite3.connect('mondev.db')
cursor = conn.cursor()

def clean_url(url):
    if url and url.startswith("http://localhost:8000https://"):
        return url.replace("http://localhost:8000", "", 1)
    return url

try:
    # Fix videos table
    cursor.execute("SELECT id, video_url, thumbnail_url FROM videos")
    videos = cursor.fetchall()
    for vid, v_url, t_url in videos:
        new_v_url = clean_url(v_url)
        new_t_url = clean_url(t_url)
        if new_v_url != v_url or new_t_url != t_url:
            cursor.execute(
                "UPDATE videos SET video_url = ?, thumbnail_url = ? WHERE id = ?",
                (new_v_url, new_t_url, vid)
            )
            print(f"Updated video {vid}")

    # Fix courses table
    cursor.execute("SELECT id, thumbnail_url FROM courses")
    courses = cursor.fetchall()
    for cid, t_url in courses:
        new_t_url = clean_url(t_url)
        if new_t_url != t_url:
            cursor.execute(
                "UPDATE courses SET thumbnail_url = ? WHERE id = ?",
                (new_t_url, cid)
            )
            print(f"Updated course {cid}")

    conn.commit()
    print("Database cleanup complete.")
except Exception as e:
    print(f"Error: {e}")
finally:
    conn.close()
