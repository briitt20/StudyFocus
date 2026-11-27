from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.apis.auth_router import router as auth_router
from backend.apis.usuarios_router import router as usuarios_router
from backend.apis.metodos_router import router as metodos_router
from backend.apis.sesiones_router import router as sesiones_router
from backend.apis.cornell_router import router as cornell_router
from backend.apis.calendario_router import router as calendario_router

app = FastAPI(
    title="StudyFocus API",
    description="Backend para la aplicación StudyFocus — gestión de sesiones, notas Cornell y calendario de estudio.",
    version="1.0.0",
)

# ---------------------------------------------------------------------------
# CORS — permite peticiones desde Angular (4200 y 4300)
# ---------------------------------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:4200",
        "http://127.0.0.1:4200",
        "http://localhost:4300",
        "http://127.0.0.1:4300",
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------------------------
# Routers
# ---------------------------------------------------------------------------
app.include_router(auth_router)
app.include_router(usuarios_router)
app.include_router(metodos_router)
app.include_router(sesiones_router)
app.include_router(cornell_router)
app.include_router(calendario_router)


@app.get("/", tags=["Health"])
def health_check():
    return {"status": "ok", "message": "StudyFocus API funcionando correctamente"}
