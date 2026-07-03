import axios from "axios";
import { SearchRequest, SearchResult } from "../types/SearchResult";

const apiClient = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 15000,
});

export const analyzeGame = async (payload: SearchRequest): Promise<SearchResult> => {
  const response = await apiClient.post<SearchResult>("/search", payload);
  return response.data;
};
