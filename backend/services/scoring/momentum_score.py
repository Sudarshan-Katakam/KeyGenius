from typing import List


def compute_momentum_score(values: List[float]) -> float:
    if len(values) < 2:
        return 0.0
    momentum = values[-1] - values[0]
    return float(momentum if momentum > 0 else 0.0)
