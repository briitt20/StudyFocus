import pyodbc
from typing import List
from fastapi import HTTPException, status

from backend.repositories import sesion_repository
from backend.schemas.sesion_schema import SesionCreate


def get_sesiones(conn: pyodbc.Connection, id_usuario: int) -> List[dict]:
    return sesion_repository.get_by_usuario(conn, id_usuario)


def create_sesion(conn: pyodbc.Connection, data: SesionCreate, id_usuario: int) -> dict:
    return sesion_repository.create(
        conn,
        id_usuario=id_usuario,
        id_metodo=data.id_metodo,
        fecha=data.fecha,
        concentracion=data.concentracion,
    )


def delete_sesion(conn: pyodbc.Connection, id_sesion: int) -> None:
    deleted = sesion_repository.delete(conn, id_sesion)
    if not deleted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Sesión no encontrada")
