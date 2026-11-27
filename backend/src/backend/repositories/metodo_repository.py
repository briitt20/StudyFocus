import pyodbc
from typing import List, Optional


def _row_to_dict(row) -> dict:
    return {
        "id_metodo": row.id_metodo,
        "nombre": row.nombre,
        "descripcion": row.descripcion,
    }


def get_all(conn: pyodbc.Connection) -> List[dict]:
    cursor = conn.cursor()
    cursor.execute("SELECT id_metodo, nombre, descripcion FROM METODO_ESTUDIO")
    return [_row_to_dict(r) for r in cursor.fetchall()]


def create(conn: pyodbc.Connection, nombre: str, descripcion: str) -> dict:
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO METODO_ESTUDIO (nombre, descripcion) "
        "OUTPUT INSERTED.id_metodo, INSERTED.nombre, INSERTED.descripcion "
        "VALUES (?, ?)",
        nombre, descripcion,
    )
    row = cursor.fetchone()
    conn.commit()
    return {"id_metodo": row[0], "nombre": row[1], "descripcion": row[2]}
