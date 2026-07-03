from fastapi import APIRouter
from models.search import SearchRequest

router = APIRouter()


@router.post("/analytics")
async def get_analytics(request: SearchRequest) -> dict[str, object]:
    return {
        "game_name": request.game_name,
        "country": request.country,
        "summary": "Keyword opportunity is available with moderate to strong demand.",
        "signal": "positive"
    }
