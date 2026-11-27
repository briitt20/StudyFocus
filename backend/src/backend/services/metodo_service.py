import pyodbc
from typing import List

from backend.repositories import metodo_repository

_METODOS_DEFAULT = [
    ("Pomodoro", "Técnica de estudio con intervalos de 25 minutos y descansos cortos."),
    ("Cornell", "Sistema de apuntes dividido en notas, palabras clave y resumen."),
    ("Feynman", "Aprende explicando el concepto con palabras simples."),
    ("Active Recall", "Técnica de recuperación activa de información memorizada."),
]


def list_metodos(conn: pyodbc.Connection) -> List[dict]:
    metodos = metodo_repository.get_all(conn)
    if not metodos:
        for nombre, descripcion in _METODOS_DEFAULT:
            metodo_repository.create(conn, nombre, descripcion)
        metodos = metodo_repository.get_all(conn)
    return metodos
