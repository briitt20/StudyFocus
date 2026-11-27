import pyodbc
from fastapi import APIRouter, Depends
from typing import List

from backend.core.database import get_db
from backend.core.security import get_current_user
from backend.schemas.calendario_schema import CalendarioCreate, CalendarioUpdate, CalendarioOut
from backend.services import calendario_service

router = APIRouter(prefix="/api/calendario", tags=["Calendario"])


@router.get("", response_model=List[CalendarioOut])
def get_eventos(
    current_user: dict = Depends(get_current_user),
    conn: pyodbc.Connection = Depends(get_db),
):
    """Lista los eventos del calendario del usuario autenticado."""
    return calendario_service.get_eventos(conn, current_user["id_usuario"])


@router.post("", response_model=CalendarioOut, status_code=201)
def create_evento(
    data: CalendarioCreate,
    current_user: dict = Depends(get_current_user),
    conn: pyodbc.Connection = Depends(get_db),
):
    """Crea un nuevo evento en el calendario."""
    return calendario_service.create_evento(conn, data, current_user["id_usuario"])


@router.put("/{id_evento}", response_model=CalendarioOut)
def update_evento(
    id_evento: int,
    data: CalendarioUpdate,
    current_user: dict = Depends(get_current_user),
    conn: pyodbc.Connection = Depends(get_db),
):
    """Actualiza un evento del calendario."""
    return calendario_service.update_evento(conn, id_evento, data)


@router.delete("/{id_evento}", status_code=204)
def delete_evento(
    id_evento: int,
    current_user: dict = Depends(get_current_user),
    conn: pyodbc.Connection = Depends(get_db),
):
    """Elimina un evento del calendario."""
    calendario_service.delete_evento(conn, id_evento)
