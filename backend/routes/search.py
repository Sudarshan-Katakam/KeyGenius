from fastapi import APIRouter, HTTPException
from models.search import SearchRequest
from models.result import SearchResult
from services.google_play_service import fetch_top_apps
from services.google_trends_service import fetch_keyword_trends
from services.scoring.trend_score import compute_trend_score
from services.scoring.momentum_score import compute_momentum_score
from services.scoring.relevancy_score import compute_relevancy_score
from services.scoring.final_score import compute_keyword_final_score
from services.scoring.competition_score import compute_competition_score
from services.scoring.market_score import compute_market_score
from services.recommendation_service import generate_recommendations

router = APIRouter()

@router.post("/search", response_model=SearchResult)
async def search_analysis(request: SearchRequest) -> SearchResult:
    if not request.game_name.strip() or not request.country.strip():
        raise HTTPException(status_code=400, detail="gameName and country are required")

    apps = fetch_top_apps(request.game_name, request.country)
    trends = fetch_keyword_trends(request.game_name, request.country)

    trend_score = compute_trend_score(trends)
    momentum = compute_momentum_score(trends)
    relevancy = compute_relevancy_score(request.game_name, request.game_name)
    popularity = round(trend_score * 1000, 2)
    keyword_final_score = compute_keyword_final_score(trend_score, momentum, relevancy)
    competition_score = compute_competition_score(len(apps), apps)
    market_score = compute_market_score(keyword_final_score, competition_score)
    competition_level = (
        "LOW" if competition_score <= 30 else "MEDIUM" if competition_score <= 70 else "HIGH"
    )
    recommended_names = generate_recommendations(request.game_name, request.country)

    keywords = [
        {
            "keyword": request.game_name,
            "trend_score": round(trend_score, 2),
            "momentum": round(momentum, 2),
            "relevancy": round(relevancy, 2),
            "popularity": round(popularity, 2),
            "final_score": round(keyword_final_score, 2),
        }
    ]

    return SearchResult(
        market_score=round(market_score, 2),
        competition_score=round(competition_score, 2),
        competition_level=competition_level,
        recommended_keyword=request.game_name,
        recommended_names=recommended_names,
        keywords=keywords,
        apps=apps,
    )
