import pyodbc
from fastapi import APIRouter, Depends
from typing import List

from backend.core.database import get_db
from backend.core.security import get_current_user
from backend.schemas.sesion_schema import SesionCreate, SesionOut
from backend.services import sesion_service

router = APIRouter(prefix="/api/sesiones", tags=["Sesiones de Estudio"])


@router.get("", response_model=List[SesionOut])
def get_sesiones(
    current_user: dict = Depends(get_current_user),
    conn: pyodbc.Connection = Depends(get_db),
):
    """Lista las sesiones de estudio del usuario autenticado."""
    return sesion_service.get_sesiones(conn, current_user["id_usuario"])


@router.post("", response_model=SesionOut, status_code=201)
def create_sesion(
    data: SesionCreate,
    current_user: dict = Depends(get_current_user),
    conn: pyodbc.Connection = Depends(get_db),
):
    """Registra una nueva sesión de estudio."""
    return sesion_service.create_sesion(conn, data, current_user["id_usuario"])


@router.delete("/{id_sesion}", status_code=204)
def delete_sesion(
    id_sesion: int,
    current_user: dict = Depends(get_current_user),
    conn: pyodbc.Connection = Depends(get_db),
):
    """Elimina una sesión de estudio."""
    sesion_service.delete_sesion(conn, id_sesion)
