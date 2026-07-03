from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.analytics import router as analytics_router
from routes.recommendations import router as recommendations_router
from routes.search import router as search_router

app = FastAPI(
    title="KeyGenius API",
    description="Google Play ASO intelligence backend for KeyGenius.",
    version="3.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:5174", "http://127.0.0.1:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(search_router, prefix="/api")
app.include_router(recommendations_router, prefix="/api")
app.include_router(analytics_router, prefix="/api")

@app.get("/")
async def health_check() -> dict[str, str]:
    return {"status": "KeyGenius backend is running"}
