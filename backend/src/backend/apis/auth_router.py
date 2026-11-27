import pyodbc
from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm

from backend.core.database import get_db
from backend.schemas.usuario_schema import UsuarioCreate, UsuarioOut, Token
from backend.services import auth_service, usuario_service

router = APIRouter(prefix="/api/auth", tags=["Auth"])


@router.post("/login", response_model=Token)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    conn: pyodbc.Connection = Depends(get_db),
):
    """Login con correo (username) y contraseña."""
    return auth_service.login(conn, correo=form_data.username, password=form_data.password)


@router.post("/register", response_model=UsuarioOut, status_code=201)
def register(
    data: UsuarioCreate,
    conn: pyodbc.Connection = Depends(get_db),
):
    """Registro de nuevo usuario."""
    return usuario_service.register(conn, data)
