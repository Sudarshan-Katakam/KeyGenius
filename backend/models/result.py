from typing import Any
from pydantic import BaseModel
from .keyword import KeywordAnalysis


class AppInfo(BaseModel):
    title: str
    score: float | None
    installs: str
    genre: str | None
    developer: str | None
    icon: str | None
    url: str | None


class MetricInsight(BaseModel):
    value: float
    explanation: list[str]


class MarketScoreMetric(MetricInsight):
    pass


class CompetitionScoreMetric(BaseModel):
    value: float
    level: str
    explanation: list[str]


class PopularityScoreMetric(MetricInsight):
    pass


class RecommendedKeyword(BaseModel):
    keyword: str
    explanation: list[str]


class RecommendedName(BaseModel):
    name: str
    explanation: list[str]


class TrendPrediction(BaseModel):
    predicted_growth_pct: float
    predicted_trend_score: float


class SearchResult(BaseModel):
    market_score: MarketScoreMetric
    competition_score: CompetitionScoreMetric
    popularity_score: PopularityScoreMetric
    opportunity_score: float
    recommended_keyword: RecommendedKeyword
    recommended_name: RecommendedName
    trend_prediction: TrendPrediction
    trend_series: list[int]
    similar_games: list[AppInfo]
    keywords: list[KeywordAnalysis]
    apps: list[AppInfo]
    metadata: dict[str, Any] | None = None
