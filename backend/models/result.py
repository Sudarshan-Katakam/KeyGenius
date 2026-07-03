from pydantic import BaseModel
from typing import List
from .keyword import KeywordAnalysis


class AppInfo(BaseModel):
    title: str
    score: float | None
    installs: str
    genre: str | None
    developer: str | None
    icon: str | None
    url: str | None


class SearchResult(BaseModel):
    market_score: float
    competition_score: float
    competition_level: str
    recommended_keyword: str
    recommended_names: List[str]
    keywords: List[KeywordAnalysis]
    apps: List[AppInfo]
