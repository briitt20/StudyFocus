import pyodbc
from fastapi import HTTPException, status

from backend.core.security import verify_password, create_access_token
from backend.repositories import usuario_repository


def login(conn: pyodbc.Connection, correo: str, password: str) -> dict:
    user = usuario_repository.get_by_correo(conn, correo)
    if user is None or not verify_password(password, user["contrasena"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Correo o contraseña incorrectos",
            headers={"WWW-Authenticate": "Bearer"},
        )
    token = create_access_token({"sub": str(user["id_usuario"])})
    return {"access_token": token, "token_type": "bearer"}
