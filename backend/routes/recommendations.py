from fastapi import APIRouter
from models.search import SearchRequest
from services.recommendation_service import generate_recommendations

router = APIRouter()


@router.post("/recommendations")
async def get_recommendations(request: SearchRequest) -> dict[str, list[str]]:
    names = generate_recommendations(request.game_name, request.country)
    return {"recommended_names": names}
