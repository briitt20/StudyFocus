import pyodbc
from typing import List, Optional


def _row_to_dict(row) -> dict:
    return {
        "id_nota": row.id_nota,
        "id_usuario": row.id_usuario,
        "tema": row.tema,
        "clave": row.clave,
        "apunte": row.apunte,
        "resumen": row.resumen,
    }


def get_by_usuario(conn: pyodbc.Connection, id_usuario: int) -> List[dict]:
    cursor = conn.cursor()
    cursor.execute(
        "SELECT id_nota, id_usuario, tema, clave, apunte, resumen "
        "FROM NOTA_CORNELL WHERE id_usuario = ?",
        id_usuario,
    )
    return [_row_to_dict(r) for r in cursor.fetchall()]


def get_by_id(conn: pyodbc.Connection, id_nota: int) -> Optional[dict]:
    cursor = conn.cursor()
    cursor.execute(
        "SELECT id_nota, id_usuario, tema, clave, apunte, resumen "
        "FROM NOTA_CORNELL WHERE id_nota = ?",
        id_nota,
    )
    row = cursor.fetchone()
    return _row_to_dict(row) if row else None


def create(
    conn: pyodbc.Connection,
    id_usuario: int,
    tema: str,
    clave: Optional[str],
    apunte: Optional[str],
    resumen: Optional[str],
) -> dict:
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO NOTA_CORNELL (id_usuario, tema, clave, apunte, resumen) "
        "OUTPUT INSERTED.id_nota, INSERTED.id_usuario, INSERTED.tema, "
        "INSERTED.clave, INSERTED.apunte, INSERTED.resumen "
        "VALUES (?, ?, ?, ?, ?)",
        id_usuario, tema, clave, apunte, resumen,
    )
    row = cursor.fetchone()
    conn.commit()
    return {
        "id_nota": row[0],
        "id_usuario": row[1],
        "tema": row[2],
        "clave": row[3],
        "apunte": row[4],
        "resumen": row[5],
    }


def update(
    conn: pyodbc.Connection,
    id_nota: int,
    tema: Optional[str],
    clave: Optional[str],
    apunte: Optional[str],
    resumen: Optional[str],
) -> Optional[dict]:
    cursor = conn.cursor()
    cursor.execute(
        "UPDATE NOTA_CORNELL "
        "SET tema = COALESCE(?, tema), clave = COALESCE(?, clave), "
        "apunte = COALESCE(?, apunte), resumen = COALESCE(?, resumen) "
        "WHERE id_nota = ?",
        tema, clave, apunte, resumen, id_nota,
    )
    conn.commit()
    return get_by_id(conn, id_nota)


def delete(conn: pyodbc.Connection, id_nota: int) -> bool:
    cursor = conn.cursor()
    cursor.execute("DELETE FROM NOTA_CORNELL WHERE id_nota = ?", id_nota)
    conn.commit()
    return cursor.rowcount > 0
