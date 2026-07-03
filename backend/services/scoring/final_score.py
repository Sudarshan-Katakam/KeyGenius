
def compute_keyword_final_score(trend_score: float, momentum: float, relevancy: float) -> float:
    return float((trend_score * 0.50) + (momentum * 0.20) + (relevancy * 0.30))
