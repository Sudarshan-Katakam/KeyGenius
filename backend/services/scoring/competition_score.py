import math
from typing import Any


def parse_install_count(installs: str) -> int:
    if not installs:
        return 0

    installs = installs.lower().replace(",", "").replace("+", "").strip()
    if installs.endswith("m"):
        return int(float(installs[:-1]) * 1_000_000)
    if installs.endswith("b"):
        return int(float(installs[:-1]) * 1_000_000_000)
    if installs.endswith("k"):
        return int(float(installs[:-1]) * 1_000)

    try:
        return int(installs)
    except ValueError:
        return 0


def compute_install_index(installs_text: str) -> float:
    installs = parse_install_count(installs_text)
    if installs <= 0:
        return 0.0

    score = min(100, max(0, math.floor(math.log10(installs) * 10)))
    return float(score)


def compute_average_rating(apps: list[dict[str, Any]]) -> float:
    ratings = [app.get("score") for app in apps if isinstance(app.get("score"), (int, float))]
    if not ratings:
        return 0.0
    return float(sum(ratings) / len(ratings))


def compute_competition_score(app_count: int, apps: list[dict[str, Any]]) -> float:
    average_rating = compute_average_rating(apps)
    install_texts = [app.get("installs", "") for app in apps]
    install_indexes = [compute_install_index(text) for text in install_texts if text]
    install_index = float(sum(install_indexes) / len(install_indexes)) if install_indexes else 0.0

    score = (app_count * 0.40) + (average_rating * 10 * 0.30) + (install_index * 0.30)
    return float(min(100.0, max(0.0, score)))
