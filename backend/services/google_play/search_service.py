from services.google_play_service import fetch_top_apps


def search_apps(game_name: str, country: str, n_hits: int = 12) -> list[dict]:
    return fetch_top_apps(game_name, country, n_hits=n_hits)
