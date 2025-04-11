import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

def test_connection():
    try:
        conn_string = os.getenv("DB_URL")
        print(f"Connecting with: {conn_string}")
        conn = psycopg2.connect(conn_string)
        cursor = conn.cursor()
        cursor.execute('SELECT version();')
        version = cursor.fetchone()
        print(f"Connected! PostgreSQL version: {version}")
        cursor.close()
        conn.close()
        return True
    except Exception as e:
        print(f"Connection error: {e}")
        return False

if __name__ == "__main__":
    test_connection()