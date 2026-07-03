from typing import Any

try:
    from google_play_scraper import search
except ImportError as exc:
    raise ImportError(
        "google_play_scraper is required for backend Google Play scraping. "
        "Install it with `pip install google-play-scraper`."
    ) from exc


def normalize_installs(installs: str) -> str:
    return installs or "0"


def fetch_top_apps(game_name: str, country: str, n_hits: int = 12) -> list[dict[str, Any]]:
    """Fetch the top matching apps from Google Play search."""
    try:
        results = search(game_name, lang="en", country=country.lower(), n_hits=n_hits)
    except Exception:
        return []

    apps = []
    for item in results:
        apps.append(
            {
                "title": item.get("title", "Unknown"),
                "score": item.get("score"),
                "installs": normalize_installs(item.get("installs", "0")),
                "genre": item.get("genre", None),
                "developer": item.get("developer", None),
                "icon": item.get("icon", None),
                "url": item.get("url", None),
            }
        )
    return apps
