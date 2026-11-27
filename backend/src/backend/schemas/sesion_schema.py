from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import date


class SesionCreate(BaseModel):
    id_metodo: int
    fecha: date
    concentracion: Optional[int] = None


class SesionOut(BaseModel):
    id_sesion: int
    id_usuario: int
    id_metodo: int
    nombre_metodo: Optional[str] = None
    fecha: date
    concentracion: Optional[int] = None

    model_config = ConfigDict(from_attributes=True)
