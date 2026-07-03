
def compute_market_score(keyword_final_score: float, competition_score: float) -> float:
    score = (keyword_final_score * 0.60) + (competition_score * 0.40)
    return float(min(100.0, max(0.0, score)))
