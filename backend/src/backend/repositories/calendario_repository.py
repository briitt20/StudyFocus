import pyodbc
from typing import List, Optional
from datetime import date


def _row_to_dict(row) -> dict:
    return {
        "id_evento": row.id_evento,
        "id_usuario": row.id_usuario,
        "titulo": row.titulo,
        "fecha": row.fecha,
        "tipo": row.tipo,
    }


def get_by_usuario(conn: pyodbc.Connection, id_usuario: int) -> List[dict]:
    cursor = conn.cursor()
    cursor.execute(
        "SELECT id_evento, id_usuario, titulo, fecha, tipo "
        "FROM EVENTO_CALENDARIO WHERE id_usuario = ?",
        id_usuario,
    )
    return [_row_to_dict(r) for r in cursor.fetchall()]


def get_by_id(conn: pyodbc.Connection, id_evento: int) -> Optional[dict]:
    cursor = conn.cursor()
    cursor.execute(
        "SELECT id_evento, id_usuario, titulo, fecha, tipo "
        "FROM EVENTO_CALENDARIO WHERE id_evento = ?",
        id_evento,
    )
    row = cursor.fetchone()
    return _row_to_dict(row) if row else None


def create(
    conn: pyodbc.Connection,
    id_usuario: int,
    titulo: str,
    fecha: date,
    tipo: Optional[str],
) -> dict:
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO EVENTO_CALENDARIO (id_usuario, titulo, fecha, tipo) "
        "OUTPUT INSERTED.id_evento, INSERTED.id_usuario, INSERTED.titulo, "
        "INSERTED.fecha, INSERTED.tipo "
        "VALUES (?, ?, ?, ?)",
        id_usuario, titulo, fecha, tipo,
    )
    row = cursor.fetchone()
    conn.commit()
    return {
        "id_evento": row[0],
        "id_usuario": row[1],
        "titulo": row[2],
        "fecha": row[3],
        "tipo": row[4],
    }


def update(
    conn: pyodbc.Connection,
    id_evento: int,
    titulo: Optional[str],
    fecha: Optional[date],
    tipo: Optional[str],
) -> Optional[dict]:
    cursor = conn.cursor()
    cursor.execute(
        "UPDATE EVENTO_CALENDARIO "
        "SET titulo = COALESCE(?, titulo), fecha = COALESCE(?, fecha), "
        "tipo = COALESCE(?, tipo) "
        "WHERE id_evento = ?",
        titulo, fecha, tipo, id_evento,
    )
    conn.commit()
    return get_by_id(conn, id_evento)


def delete(conn: pyodbc.Connection, id_evento: int) -> bool:
    cursor = conn.cursor()
    cursor.execute("DELETE FROM EVENTO_CALENDARIO WHERE id_evento = ?", id_evento)
    conn.commit()
    return cursor.rowcount > 0
