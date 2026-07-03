from typing import List


def compute_trend_score(values: List[float]) -> float:
    if not values:
        return 0.0
    return float(sum(values) / len(values))
