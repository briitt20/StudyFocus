from pydantic import BaseModel, ConfigDict
from typing import Optional


class CornellCreate(BaseModel):
    tema: str
    clave: Optional[str] = None
    apunte: Optional[str] = None
    resumen: Optional[str] = None


class CornellUpdate(BaseModel):
    tema: Optional[str] = None
    clave: Optional[str] = None
    apunte: Optional[str] = None
    resumen: Optional[str] = None


class CornellOut(BaseModel):
    id_nota: int
    id_usuario: int
    tema: str
    clave: Optional[str] = None
    apunte: Optional[str] = None
    resumen: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)
