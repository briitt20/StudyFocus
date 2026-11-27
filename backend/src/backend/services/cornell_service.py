import pyodbc
from typing import List
from fastapi import HTTPException, status

from backend.repositories import cornell_repository
from backend.schemas.cornell_schema import CornellCreate, CornellUpdate


def get_notas(conn: pyodbc.Connection, id_usuario: int) -> List[dict]:
    return cornell_repository.get_by_usuario(conn, id_usuario)


def create_nota(conn: pyodbc.Connection, data: CornellCreate, id_usuario: int) -> dict:
    return cornell_repository.create(
        conn,
        id_usuario=id_usuario,
        tema=data.tema,
        clave=data.clave,
        apunte=data.apunte,
        resumen=data.resumen,
    )


def update_nota(conn: pyodbc.Connection, id_nota: int, data: CornellUpdate) -> dict:
    nota = cornell_repository.update(
        conn,
        id_nota=id_nota,
        tema=data.tema,
        clave=data.clave,
        apunte=data.apunte,
        resumen=data.resumen,
    )
    if not nota:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Nota no encontrada")
    return nota


def delete_nota(conn: pyodbc.Connection, id_nota: int) -> None:
    deleted = cornell_repository.delete(conn, id_nota)
    if not deleted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Nota no encontrada")
