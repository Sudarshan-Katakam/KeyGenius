from typing import List

try:
    from pytrends.request import TrendReq
except ImportError as exc:
    raise ImportError(
        "pytrends is required for backend trends analysis. "
        "Install it with `pip install pytrends`."
    ) from exc


def fetch_keyword_trends(keyword: str, country: str, timeframe: str = "today 3-m") -> List[float]:
    """Fetch Google Trends values for a single keyword."""
    try:
        pytrends = TrendReq(hl="en-US", tz=360)
        pytrends.build_payload([keyword], cat=0, timeframe=timeframe, geo=country.upper(), gprop="")
        data = pytrends.interest_over_time()
    except Exception:
        return []

    if data.empty or keyword not in data.columns:
        return []

    values = [float(v) for v in data[keyword].tolist() if v is not None]
    return values


def fetch_multiple_keyword_trends(keywords: List[str], country: str, timeframe: str = "today 3-m") -> dict[str, List[float]]:
    """Fetch Google Trends values for multiple keywords in a single request."""
    try:
        pytrends = TrendReq(hl="en-US", tz=360)
        pytrends.build_payload(keywords, cat=0, timeframe=timeframe, geo=country.upper(), gprop="")
        data = pytrends.interest_over_time()
    except Exception:
        return {keyword: [] for keyword in keywords}

    trends = {}
    for keyword in keywords:
        if keyword in data.columns:
            trends[keyword] = [float(v) for v in data[keyword].tolist() if v is not None]
        else:
            trends[keyword] = []
    return trends
