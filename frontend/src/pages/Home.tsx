import { useEffect, useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Sparkles } from "lucide-react";
// import Header from "../components/Header";
import SearchForm from "../components/SearchForm";
import MarketCard from "../components/MarketCard";
import CompetitionCard from "../components/CompetitionCard";
import RecommendationCard from "../components/RecommendationCard";
import KeywordTable from "../components/KeywordTable";
import AppCard from "../components/AppCard";
import ExportButton from "../components/ExportButton";
import Loading from "../components/Loading";
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
      {/* <Header /> */}

      <main className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 py-8">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] items-start">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700">
              <Sparkles className="h-4 w-4" />
              Google Play ASO
            </div>

            <div className="mt-6">
              <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">KeyGenius</h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">Real-time Google Play ASO intelligence for indie game developers — find better keywords, spot competition, and get title recommendations.</p>
            </div>

            <div className="mt-10">
              <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6">
                <SearchForm onAnalyze={handleAnalyze} isLoading={isLoading} />
              </div>
            </div>
          </div>

          <div ref={resultsRef} className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
              <div className="grid gap-6 md:grid-cols-2">
                <MarketCard marketScore={result?.market_score ?? 0} recommendedKeyword={result?.recommended_keyword ?? "carrom"} />
                <CompetitionCard competitionScore={result?.competition_score ?? 0} competitionLevel={result?.competition_level ?? "Medium"} />
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-slate-900">Keyword Analysis</h3>
                  <p className="mt-2 text-sm text-slate-600">Detailed keyword ratings from Trends and relevance.</p>
                </div>
                <div className="overflow-x-auto">
                  {result ? (
                    <KeywordTable keywords={result.keywords} />
                  ) : (
                    <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6 text-slate-500">
                      Search any game to preview keyword performance instantly.
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">Recommended Names</h3>
                <p className="mt-2 text-sm text-slate-600">Keyword-optimized titles tailored for your game concept.</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {result ? (
                    result.recommended_names.map((name) => (
                      <span key={name} className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">{name}</span>
                    ))
                  ) : (
                    <>
                      <span className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">Carrom Clash</span>
                      <span className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">Carrom Arena</span>
                      <span className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">Carrom Pro</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {result ? (
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">Top Competitors</h2>
                    <p className="mt-2 text-sm text-slate-600">Apps currently ranking for your keyword in Google Play.</p>
                  </div>
                  <ExportButton gameName={searchParams.gameName} country={searchParams.country} result={result} />
                </div>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {result.apps.map((app) => (
                    <AppCard key={app.title + app.developer} app={app} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-6 text-center text-slate-600 shadow-sm">
                <h2 className="text-xl font-semibold text-slate-900">Start your Google Play ASO analysis</h2>
                <p className="mt-3 text-sm">Enter a game name and country, then click Analyze to preview keywords and competition intelligence.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
