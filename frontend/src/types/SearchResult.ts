import { AppInfo } from "./App";
import { KeywordAnalysis } from "./Keyword";

export interface SearchRequest {
  gameName: string;
  country: string;
}

export interface SearchResult {
  market_score: number;
  competition_score: number;
  competition_level: string;
  recommended_keyword: string;
  recommended_names: string[];
  keywords: KeywordAnalysis[];
  apps: AppInfo[];
}
