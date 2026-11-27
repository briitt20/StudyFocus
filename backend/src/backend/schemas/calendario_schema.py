from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import date


class CalendarioCreate(BaseModel):
    titulo: str
    fecha: date
    tipo: Optional[str] = None


class CalendarioUpdate(BaseModel):
    titulo: Optional[str] = None
    fecha: Optional[date] = None
    tipo: Optional[str] = None


class CalendarioOut(BaseModel):
    id_evento: int
    id_usuario: int
    titulo: str
    fecha: date
    tipo: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)
