from pydantic import BaseModel, EmailStr, ConfigDict
from typing import Optional


class UsuarioCreate(BaseModel):
    nombre: str
    correo: EmailStr
    contrasena: str  # campo de entrada sin tilde para evitar problemas de encoding
    carrera: Optional[str] = None
    ciclo: Optional[int] = None


class UsuarioUpdate(BaseModel):
    nombre: Optional[str] = None
    carrera: Optional[str] = None
    ciclo: Optional[int] = None


class UsuarioOut(BaseModel):
    id_usuario: int
    nombre: str
    correo: str
    carrera: Optional[str] = None
    ciclo: Optional[int] = None

    model_config = ConfigDict(from_attributes=True)


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class LoginRequest(BaseModel):
    correo: EmailStr
    contrasena: str
