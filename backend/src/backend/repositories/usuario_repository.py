import pyodbc
from typing import Optional


def _row_to_dict(row) -> dict:
    return {
        "id_usuario": row.id_usuario,
        "nombre": row.nombre,
        "correo": row.correo,
        "carrera": row.carrera,
        "ciclo": row.ciclo,
    }


def get_by_correo(conn: pyodbc.Connection, correo: str) -> Optional[dict]:
    cursor = conn.cursor()
    cursor.execute(
        "SELECT id_usuario, nombre, correo, [contraseña], carrera, ciclo "
        "FROM USUARIO WHERE correo = ?",
        correo,
    )
    row = cursor.fetchone()
    if row is None:
        return None
    return {
        "id_usuario": row.id_usuario,
        "nombre": row.nombre,
        "correo": row.correo,
        "contrasena": row[3],  # [contraseña] accedido por índice para evitar problemas de nombre
        "carrera": row.carrera,
        "ciclo": row.ciclo,
    }


def get_by_id(conn: pyodbc.Connection, id_usuario: int) -> Optional[dict]:
    cursor = conn.cursor()
    cursor.execute(
        "SELECT id_usuario, nombre, correo, carrera, ciclo "
        "FROM USUARIO WHERE id_usuario = ?",
        id_usuario,
    )
    row = cursor.fetchone()
    return _row_to_dict(row) if row else None


def create(
    conn: pyodbc.Connection,
    nombre: str,
    correo: str,
    contrasena_hash: str,
    carrera: Optional[str],
    ciclo: Optional[int],
) -> dict:
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO USUARIO (nombre, correo, [contraseña], carrera, ciclo) "
        "OUTPUT INSERTED.id_usuario, INSERTED.nombre, INSERTED.correo, "
        "INSERTED.carrera, INSERTED.ciclo "
        "VALUES (?, ?, ?, ?, ?)",
        nombre, correo, contrasena_hash, carrera, ciclo,
    )
    row = cursor.fetchone()
    conn.commit()
    return {
        "id_usuario": row[0],
        "nombre": row[1],
        "correo": row[2],
        "carrera": row[3],
        "ciclo": row[4],
    }


def update(
    conn: pyodbc.Connection,
    id_usuario: int,
    nombre: Optional[str],
    carrera: Optional[str],
    ciclo: Optional[int],
) -> Optional[dict]:
    cursor = conn.cursor()
    cursor.execute(
        "UPDATE USUARIO SET nombre = COALESCE(?, nombre), "
        "carrera = COALESCE(?, carrera), ciclo = COALESCE(?, ciclo) "
        "WHERE id_usuario = ?",
        nombre, carrera, ciclo, id_usuario,
    )
    conn.commit()
    return get_by_id(conn, id_usuario)
