def compute_opportunity_score(trend_score: float, momentum: float, competition_score: float) -> float:
    return float((trend_score * 0.5) + (momentum * 0.3) + ((100 - competition_score) * 0.2))
