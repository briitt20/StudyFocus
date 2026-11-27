import pyodbc
from typing import List, Optional
from datetime import date


def _row_to_dict(row) -> dict:
    return {
        "id_sesion": row[0],
        "id_usuario": row[1],
        "id_metodo": row[2],
        "fecha": row[3],
        "concentracion": row[4],
        "nombre_metodo": row[5],
    }


def get_by_usuario(conn: pyodbc.Connection, id_usuario: int) -> List[dict]:
    cursor = conn.cursor()
    cursor.execute(
        "SELECT s.id_sesion, s.id_usuario, s.id_metodo, s.fecha, s.concentracion, "
        "m.nombre AS nombre_metodo "
        "FROM SESION_ESTUDIO s "
        "INNER JOIN METODO_ESTUDIO m ON s.id_metodo = m.id_metodo "
        "WHERE s.id_usuario = ?",
        id_usuario,
    )
    return [_row_to_dict(r) for r in cursor.fetchall()]


def create(
    conn: pyodbc.Connection,
    id_usuario: int,
    id_metodo: int,
    fecha: date,
    concentracion: Optional[int],
) -> dict:
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO SESION_ESTUDIO (id_usuario, id_metodo, fecha, concentracion) "
        "OUTPUT INSERTED.id_sesion, INSERTED.id_usuario, INSERTED.id_metodo, "
        "INSERTED.fecha, INSERTED.concentracion "
        "VALUES (?, ?, ?, ?)",
        id_usuario, id_metodo, fecha, concentracion,
    )
    row = cursor.fetchone()
    conn.commit()
    return {
        "id_sesion": row[0],
        "id_usuario": row[1],
        "id_metodo": row[2],
        "fecha": row[3],
        "concentracion": row[4],
        "nombre_metodo": None,  # se puede consultar después si se necesita
    }


def delete(conn: pyodbc.Connection, id_sesion: int) -> bool:
    cursor = conn.cursor()
    cursor.execute("DELETE FROM SESION_ESTUDIO WHERE id_sesion = ?", id_sesion)
    conn.commit()
    return cursor.rowcount > 0
