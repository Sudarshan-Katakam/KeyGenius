import { useEffect, useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Sparkles } from "lucide-react";
import SearchForm from "../components/SearchForm";
import KeywordTable from "../components/KeywordTable";
import ExportButton from "../components/ExportButton";
import Loading from "../components/Loading";
import PopularityCard from "../components/PopularityCard";
import OpportunityCard from "../components/OpportunityCard";
import TrendChart from "../components/TrendChart";
import SimilarGames from "../components/SimilarGames";
import CompetitorTable from "../components/CompetitorTable";
import InfoTooltip from "../components/InfoTooltip";
import { analyzeGame } from "../services/api";
import { SearchResult, SearchRequest } from "../types/SearchResult";

const Home = () => {
  const [result, setResult] = useState<SearchResult | null>(null);
  const [searchParams, setSearchParams] = useState<SearchRequest>({ gameName: "carrom", country: "IN" });
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async (data: SearchRequest) => {
    setIsLoading(true);
    setResult(null);
    setSearchParams(data);

    try {
      const response = await analyzeGame(data);
      setResult(response);
    } catch (error) {
      toast.error("Unable to fetch analysis. Please ensure the backend is running.");
    } finally {
      setIsLoading(false);
    }
  };

  const resultsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (result && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [result]);

  return (
    <div className="min-h-screen bg-slate-100">
      <Toaster position="top-right" />

      <main className="mx-auto w-full max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid items-start gap-8 xl:grid-cols-[1.05fr_0.95fr]">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700">
              <Sparkles className="h-4 w-4" />
              Google Play ASO
            </div>

            <div className="mt-6">
              <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">KeyGenius</h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">Real-time Google Play ASO intelligence for indie game developers — find better keywords, spot competition, and get title recommendations.</p>
            </div>

            <div className="mt-10">
              <div className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-6">
                <SearchForm onAnalyze={handleAnalyze} isLoading={isLoading} />
              </div>
            </div>
          </section>

          <section ref={resultsRef} className="space-y-6">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">Market Score</h3>
                      <p className="mt-2 text-sm text-slate-600">Overall opportunity strength in the selected market.</p>
                    </div>
                    <InfoTooltip title="Market score" description="Combines demand and competition to estimate how attractive the keyword market is." />
                  </div>
                  <div className="mt-6 text-4xl font-bold text-slate-900">{result?.market_score.value ?? 0}</div>
                  <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
                    <div className="font-semibold text-slate-900">Recommended keyword</div>
                    <div className="mt-2">{result?.recommended_keyword.keyword ?? "carrom"}</div>
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">Competition Score</h3>
                      <p className="mt-2 text-sm text-slate-600">How crowded the search space looks.</p>
                    </div>
                    <InfoTooltip title="Competition score" description="Estimates how competitive the keyword is based on available apps and install scale." />
                  </div>
                  <div className="mt-6 text-4xl font-bold text-slate-900">{result?.competition_score.value ?? 0}</div>
                  <div className="mt-4 text-sm uppercase tracking-[0.2em] text-slate-500">{result?.competition_score.level ?? "MEDIUM"}</div>
                </div>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <PopularityCard metric={result?.popularity_score ?? { value: 0, explanation: ["Waiting for analysis"] }} />
              <OpportunityCard value={result?.opportunity_score ?? 0} />
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Trend Prediction</h3>
                  <p className="mt-2 text-sm text-slate-600">Forecasted growth and next-step signal for the keyword.</p>
                </div>
                <div className="rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700">
                  +{result?.trend_prediction.predicted_growth_pct ?? 0}% growth
                </div>
              </div>
              <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <div>
                  <TrendChart values={result?.trend_series ?? [20, 35, 40, 48, 54]} />
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                  <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Predicted trend score</div>
                  <div className="mt-4 text-4xl font-bold text-slate-900">{result?.trend_prediction.predicted_trend_score ?? 0}</div>
                  <p className="mt-4 text-sm text-slate-600">The signal suggests healthy momentum for discoverability if the title and keyword targeting stay aligned.</p>
                </div>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">Keyword Analysis</h3>
                    <p className="mt-2 text-sm text-slate-600">Detailed keyword scoring and trend quality.</p>
                  </div>
                  <div className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">Live</div>
                </div>
                {isLoading ? (
                  <Loading />
                ) : result ? (
                  <KeywordTable keywords={result.keywords} />
                ) : (
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-slate-500">Search any game to preview keyword performance instantly.</div>
                )}
              </div>

              <div className="space-y-6">
                <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">Recommended Name</h3>
                      <p className="mt-2 text-sm text-slate-600">The strongest naming candidate for your target keyword.</p>
                    </div>
                    <InfoTooltip title="Name recommendation" description="A concise title suggestion that balances discoverability and memorability." />
                  </div>
                  <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <div className="text-xl font-semibold text-slate-900">{result?.recommended_name.name ?? "Carrom Clash"}</div>
                    <p className="mt-3 text-sm text-slate-600">{result?.recommended_name.explanation.join(" • ") ?? "Contains the primary keyword and is easy to remember."}</p>
                  </div>
                </div>

                <SimilarGames apps={result?.similar_games ?? []} />
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Top Competitors</h2>
                  <p className="mt-2 text-sm text-slate-600">Apps currently ranking for your keyword in Google Play.</p>
                </div>
                <ExportButton gameName={searchParams.gameName} country={searchParams.country} result={result} />
              </div>
              <div className="mt-6">
                {result ? (
                  <CompetitorTable apps={result.apps} />
                ) : (
                  <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-slate-600">
                    Run an analysis to view competitor rankings, similarity signals, and export-ready insights.
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Home;
