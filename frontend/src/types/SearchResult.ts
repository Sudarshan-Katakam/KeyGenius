import { AppInfo } from "./App";
import { KeywordAnalysis } from "./Keyword";

export interface SearchRequest {
  gameName: string;
  country: string;
}

export interface MetricInsight {
  value: number;
  explanation: string[];
}

export interface CompetitionScoreMetric extends MetricInsight {
  level: string;
}

export interface RecommendedKeyword {
  keyword: string;
  explanation: string[];
}

export interface RecommendedName {
  name: string;
  explanation: string[];
}

export interface TrendPrediction {
  predicted_growth_pct: number;
  predicted_trend_score: number;
}

export interface SearchResult {
  market_score: MetricInsight;
  competition_score: CompetitionScoreMetric;
  popularity_score: MetricInsight;
  opportunity_score: number;
  recommended_keyword: RecommendedKeyword;
  recommended_name: RecommendedName;
  trend_prediction: TrendPrediction;
  trend_series: number[];
  similar_games: AppInfo[];
  keywords: KeywordAnalysis[];
  apps: AppInfo[];
  metadata?: Record<string, unknown>;
}
