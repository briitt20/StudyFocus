import pyodbc
from typing import List
from fastapi import HTTPException, status

from backend.repositories import calendario_repository
from backend.schemas.calendario_schema import CalendarioCreate, CalendarioUpdate


def get_eventos(conn: pyodbc.Connection, id_usuario: int) -> List[dict]:
    return calendario_repository.get_by_usuario(conn, id_usuario)


def create_evento(conn: pyodbc.Connection, data: CalendarioCreate, id_usuario: int) -> dict:
    return calendario_repository.create(
        conn,
        id_usuario=id_usuario,
        titulo=data.titulo,
        fecha=data.fecha,
        tipo=data.tipo,
    )


def update_evento(conn: pyodbc.Connection, id_evento: int, data: CalendarioUpdate) -> dict:
    evento = calendario_repository.update(
        conn,
        id_evento=id_evento,
        titulo=data.titulo,
        fecha=data.fecha,
        tipo=data.tipo,
    )
    if not evento:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Evento no encontrado")
    return evento


def delete_evento(conn: pyodbc.Connection, id_evento: int) -> None:
    deleted = calendario_repository.delete(conn, id_evento)
    if not deleted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Evento no encontrado")
