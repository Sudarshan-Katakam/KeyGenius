from pydantic import BaseModel


class KeywordAnalysis(BaseModel):
    keyword: str
    trend_score: float
    momentum: float
    relevancy: float
    popularity: float
    final_score: float
