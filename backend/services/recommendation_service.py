from typing import List

from services.google_trends_service import fetch_multiple_keyword_trends
from services.scoring.relevancy_score import compute_relevancy_score
from services.scoring.trend_score import compute_trend_score
from services.scoring.momentum_score import compute_momentum_score
from services.scoring.final_score import compute_keyword_final_score


RECOMMENDATION_SUFFIXES = [
    "Clash",
    "Arena",
    "Pro",
    "Royale",
    "Legends",
    "Quest",
    "Saga",
    "Kingdom",
    "Battle",
    "Ultimate"
]


def build_candidate_names(base_name: str) -> List[str]:
    base_name = base_name.strip().title()
    candidates = [f"{base_name} {suffix}" for suffix in RECOMMENDATION_SUFFIXES]
    candidates.append(f"Ultimate {base_name}")
    return candidates


def generate_recommendations(base_name: str, country: str, max_recommendations: int = 3) -> List[str]:
    """Generate recommended game names sorted by keyword intelligence score."""
    candidates = build_candidate_names(base_name)
    trends = fetch_multiple_keyword_trends(candidates, country)

    scored_candidates = []
    for candidate in candidates:
        values = trends.get(candidate, [])
        if not values:
            continue

        trend_score = compute_trend_score(values)
        momentum = compute_momentum_score(values)
        relevancy = compute_relevancy_score(base_name, candidate)
        final_score = compute_keyword_final_score(trend_score, momentum, relevancy)

        scored_candidates.append((final_score, candidate))

    if not scored_candidates:
        return candidates[:max_recommendations]

    scored_candidates.sort(key=lambda item: item[0], reverse=True)
    return [candidate for _, candidate in scored_candidates[:max_recommendations]]
