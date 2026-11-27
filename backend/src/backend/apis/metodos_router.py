import pyodbc
from fastapi import APIRouter, Depends
from typing import List

from backend.core.database import get_db
from backend.core.security import get_current_user
from backend.services import metodo_service

router = APIRouter(prefix="/api/metodos", tags=["Metodos de Estudio"])


@router.get("", response_model=List[dict])
def list_metodos(
    current_user: dict = Depends(get_current_user),
    conn: pyodbc.Connection = Depends(get_db),
):
    """Lista los métodos de estudio. Los siembra si la tabla está vacía."""
    return metodo_service.list_metodos(conn)
