import pyodbc
from fastapi import HTTPException, status

from backend.core.security import hash_password
from backend.repositories import usuario_repository
from backend.schemas.usuario_schema import UsuarioCreate, UsuarioUpdate


def register(conn: pyodbc.Connection, data: UsuarioCreate) -> dict:
    existing = usuario_repository.get_by_correo(conn, data.correo)
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Ya existe un usuario con ese correo",
        )
    hashed = hash_password(data.contrasena)
    return usuario_repository.create(
        conn,
        nombre=data.nombre,
        correo=data.correo,
        contrasena_hash=hashed,
        carrera=data.carrera,
        ciclo=data.ciclo,
    )


def get_profile(conn: pyodbc.Connection, id_usuario: int) -> dict:
    user = usuario_repository.get_by_id(conn, id_usuario)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuario no encontrado")
    return user


def update_profile(conn: pyodbc.Connection, id_usuario: int, data: UsuarioUpdate) -> dict:
    user = usuario_repository.update(
        conn,
        id_usuario=id_usuario,
        nombre=data.nombre,
        carrera=data.carrera,
        ciclo=data.ciclo,
    )
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuario no encontrado")
    return user
