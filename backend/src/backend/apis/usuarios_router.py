import pyodbc
from fastapi import APIRouter, Depends

from backend.core.database import get_db
from backend.core.security import get_current_user
from backend.schemas.usuario_schema import UsuarioOut, UsuarioUpdate
from backend.services import usuario_service

router = APIRouter(prefix="/api/usuarios", tags=["Usuarios"])


@router.get("/me", response_model=UsuarioOut)
def get_me(
    current_user: dict = Depends(get_current_user),
    conn: pyodbc.Connection = Depends(get_db),
):
    """Obtiene el perfil del usuario autenticado."""
    return usuario_service.get_profile(conn, current_user["id_usuario"])


@router.put("/me", response_model=UsuarioOut)
def update_me(
    data: UsuarioUpdate,
    current_user: dict = Depends(get_current_user),
    conn: pyodbc.Connection = Depends(get_db),
):
    """Actualiza el perfil del usuario autenticado."""
    return usuario_service.update_profile(conn, current_user["id_usuario"], data)
