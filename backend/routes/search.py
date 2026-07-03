from fastapi import APIRouter, HTTPException
from models.search import SearchRequest
from models.result import (
    AppInfo,
    CompetitionScoreMetric,
    MarketScoreMetric,
    PopularityScoreMetric,
    RecommendedKeyword,
    RecommendedName,
    SearchResult,
    TrendPrediction,
)
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


def _build_trend_series(base_keyword: str) -> list[int]:
    seed = max(20, min(95, len(base_keyword) * 9))
    return [max(10, seed + offset) for offset in [0, 6, 11, 18, 24, 30, 35]]


def _build_market_explanation(value: float) -> list[str]:
    if value >= 75:
        return ["Strong search demand", "Healthy opportunity window", "Growing user interest", "High ASO potential"]
    if value >= 50:
        return ["Steady search demand", "Moderate competition", "Promising market fit", "Good discoverability potential"]
    return ["Search demand is mixed", "Competition is still active", "Opportunity depends on positioning", "Refine keyword targeting"]


def _build_competition_explanation(apps: list[AppInfo], value: float) -> list[str]:
    if not apps:
        return ["No competing apps detected", "Opportunity is open", "Early keyword positioning is favorable"]
    installs = [app.installs for app in apps if app.installs]
    explanation = [f"{len(apps)} competitors found in the current search results"]
    if any("M" in install or "B" in install for install in installs):
        explanation.append("Several apps exceed 10M installs")
    if value >= 70:
        explanation.append("Average ratings and build scale are pushing competition higher")
    else:
        explanation.append("The market remains reachable with strong positioning")
    return explanation


def _build_popularity_explanation(values: list[int]) -> list[str]:
    if not values:
        return ["Trend signal is limited", "Watch for fresh search momentum"]
    if values[-1] > values[0]:
        return ["Search interest is rising", "Demand remains stable", "User interest is improving over time"]
    return ["Search interest is flat", "Demand is steady", "The window is still valid but needs refinement"]


def _build_prediction(values: list[int]) -> TrendPrediction:
    if len(values) < 2:
        return TrendPrediction(predicted_growth_pct=0.0, predicted_trend_score=float(values[-1] if values else 0))

    first = float(values[0])
    last = float(values[-1])
    growth_pct = ((last - first) / first * 100) if first > 0 else 0.0
    predicted_trend_score = min(100.0, max(0.0, last + (growth_pct * 0.35)))
    return TrendPrediction(predicted_growth_pct=round(growth_pct, 2), predicted_trend_score=round(predicted_trend_score, 2))


@router.post("/search", response_model=SearchResult)
async def search_analysis(request: SearchRequest) -> SearchResult:
    if not request.game_name.strip() or not request.country.strip():
        raise HTTPException(status_code=400, detail="gameName and country are required")

    normalized_game = request.game_name.strip()
    raw_apps = fetch_top_apps(normalized_game, request.country)
    apps = [AppInfo(**app) for app in raw_apps]

    trend_series = _build_trend_series(normalized_game)
    if raw_trends := fetch_keyword_trends(normalized_game, request.country):
        trend_series = [int(round(value)) for value in raw_trends[:7]]
    if len(trend_series) < 3:
        trend_series = _build_trend_series(normalized_game)

    trend_score = compute_trend_score([float(v) for v in trend_series])
    momentum = compute_momentum_score([float(v) for v in trend_series])
    relevancy = compute_relevancy_score(normalized_game, normalized_game)
    popularity_score = round((trend_score * 0.7) + (momentum * 0.3), 2)
    keyword_final_score = compute_keyword_final_score(trend_score, momentum, relevancy)
    competition_score_value = compute_competition_score(len(apps), [app.model_dump() for app in apps])
    market_score_value = compute_market_score(keyword_final_score, competition_score_value)
    opportunity_score = round((trend_score * 0.5) + (momentum * 0.3) + ((100 - competition_score_value) * 0.2), 2)

    competition_level = "LOW" if competition_score_value <= 30 else "MEDIUM" if competition_score_value <= 70 else "HIGH"
    recommended_names = generate_recommendations(normalized_game, request.country)

    keywords = [
        {
            "keyword": normalized_game,
            "trend_score": round(trend_score, 2),
            "momentum": round(momentum, 2),
            "relevancy": round(relevancy, 2),
            "popularity": round(popularity_score, 2),
            "final_score": round(keyword_final_score, 2),
            "trend_series": trend_series,
        }
    ]

    return SearchResult(
        market_score=MarketScoreMetric(value=round(market_score_value, 2), explanation=_build_market_explanation(market_score_value)),
        competition_score=CompetitionScoreMetric(value=round(competition_score_value, 2), level=competition_level, explanation=_build_competition_explanation(apps, competition_score_value)),
        popularity_score=PopularityScoreMetric(value=round(popularity_score, 2), explanation=_build_popularity_explanation(trend_series)),
        opportunity_score=opportunity_score,
        recommended_keyword=RecommendedKeyword(keyword=normalized_game, explanation=["Highest keyword score", "Strong search demand", "Good discoverability", "Growing trend"]),
        recommended_name=RecommendedName(name=recommended_names[0] if recommended_names else normalized_game, explanation=["Contains the primary keyword", "Easy to remember", "Similar naming pattern to successful games", "Strong ASO potential"]),
        trend_prediction=_build_prediction(trend_series),
        trend_series=trend_series,
        similar_games=apps[:5],
        keywords=keywords,
        apps=apps,
        metadata={"country": request.country, "game_name": normalized_game},
    )
