import pyodbc
from typing import Generator
from backend.core.config import settings


def get_connection() -> pyodbc.Connection:
    conn_str = (
        f"DRIVER={{{settings.DB_DRIVER}}};"
        f"SERVER={settings.DB_SERVER};"
        f"DATABASE={settings.DB_NAME};"
        f"UID={settings.DB_USER};"
        f"PWD={settings.DB_PASSWORD}"
    )
    return pyodbc.connect(conn_str)


def get_db() -> Generator:
    conn = get_connection()
    try:
        yield conn
    finally:
        conn.close()
