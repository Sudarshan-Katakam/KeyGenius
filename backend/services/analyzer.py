from typing import Dict
from models.search import SearchRequest, SearchResult

MOCK_RESPONSES: Dict[str, SearchResult] = {
    "India": SearchResult(
        trending_names=["Carrom Pool", "Carrom King", "Real Carrom"],
        recommended_names=["Carrom Clash", "Carrom Arena", "Ultimate Carrom"],
        market_score=82,
        competition_level="Medium",
    ),
    "United States": SearchResult(
        trending_names=["Arcade Carrom", "Carrom Smash", "Carrom Legends"],
        recommended_names=["Carrom Hero", "Carrom Arena", "Pool Carrom"],
        market_score=78,
        competition_level="Medium",
    ),
    "United Kingdom": SearchResult(
        trending_names=["Royal Carrom", "Carrom Battle", "Elite Carrom"],
        recommended_names=["Carrom Clash", "UltiCarrom", "Carrom Arena"],
        market_score=79,
        competition_level="Medium",
    ),
    "Brazil": SearchResult(
        trending_names=["Carrom Brasil", "Carrom Mania", "Carrom Pro"],
        recommended_names=["Carrom Clash", "Carrom Carnival", "Ultimate Carrom"],
        market_score=80,
        competition_level="Medium",
    ),
    "Canada": SearchResult(
        trending_names=["Carrom Cold", "Carrom Drive", "Carrom Legends"],
        recommended_names=["Carrom Clash", "Northern Carrom", "Ultimate Carrom"],
        market_score=81,
        competition_level="Medium",
    ),
}


def analyze_search(request: SearchRequest) -> SearchResult:
    """Return a mock analysis result based on the selected country."""
    return MOCK_RESPONSES.get(
        request.country,
        SearchResult(
            trending_names=["Carrom Pool", "Carrom King", "Real Carrom"],
            recommended_names=["Carrom Clash", "Carrom Arena", "Ultimate Carrom"],
            market_score=82,
            competition_level="Medium",
        ),
    )
