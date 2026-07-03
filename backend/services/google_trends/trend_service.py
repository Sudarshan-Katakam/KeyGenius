from services.google_trends_service import fetch_keyword_trends, fetch_multiple_keyword_trends


def fetch_trends(keyword: str, country: str, timeframe: str = "today 3-m") -> list[float]:
    return fetch_keyword_trends(keyword, country, timeframe=timeframe)


def fetch_multiple_trends(keywords: list[str], country: str, timeframe: str = "today 3-m") -> dict[str, list[float]]:
    return fetch_multiple_keyword_trends(keywords, country, timeframe=timeframe)
