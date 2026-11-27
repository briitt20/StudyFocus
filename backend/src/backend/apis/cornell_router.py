import pyodbc
from fastapi import APIRouter, Depends
from typing import List

from backend.core.database import get_db
from backend.core.security import get_current_user
from backend.schemas.cornell_schema import CornellCreate, CornellUpdate, CornellOut
from backend.services import cornell_service

router = APIRouter(prefix="/api/cornell", tags=["Notas Cornell"])


@router.get("", response_model=List[CornellOut])
def get_notas(
    current_user: dict = Depends(get_current_user),
    conn: pyodbc.Connection = Depends(get_db),
):
    """Lista las notas Cornell del usuario autenticado."""
    return cornell_service.get_notas(conn, current_user["id_usuario"])


@router.post("", response_model=CornellOut, status_code=201)
def create_nota(
    data: CornellCreate,
    current_user: dict = Depends(get_current_user),
    conn: pyodbc.Connection = Depends(get_db),
):
    """Crea una nueva nota Cornell."""
    return cornell_service.create_nota(conn, data, current_user["id_usuario"])


@router.put("/{id_nota}", response_model=CornellOut)
def update_nota(
    id_nota: int,
    data: CornellUpdate,
    current_user: dict = Depends(get_current_user),
    conn: pyodbc.Connection = Depends(get_db),
):
    """Actualiza una nota Cornell existente."""
    return cornell_service.update_nota(conn, id_nota, data)


@router.delete("/{id_nota}", status_code=204)
def delete_nota(
    id_nota: int,
    current_user: dict = Depends(get_current_user),
    conn: pyodbc.Connection = Depends(get_db),
):
    """Elimina una nota Cornell."""
    cornell_service.delete_nota(conn, id_nota)
