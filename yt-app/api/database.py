import os
from dotenv import load_dotenv, find_dotenv
import psycopg2

load_dotenv(find_dotenv())

POSTGRES_URL = os.getenv("POSTGRES_URL")

def execute(query, params=None, fetch=False):
  conn = psycopg2.connect(POSTGRES_URL)
  cur = conn.cursor()

  try:
    cur.execute(query, params or ())
    result = cur.fetchall() if fetch else None
    conn.commit()
    return result
  except Exception as e:
    conn.rollback()
    raise e
  finally:
    cur.close()
    conn.close()