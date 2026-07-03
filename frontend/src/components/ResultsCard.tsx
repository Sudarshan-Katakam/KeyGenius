import { SearchResult } from "../types/SearchResult";
import RecommendationList from "./RecommendationList";
import ExportButton from "./ExportButton";

interface ResultsCardProps {
  gameName: string;
  country: string;
  result: SearchResult | null;
  isLoading: boolean;
}

const ResultsCard = ({ gameName, country, result, isLoading }: ResultsCardProps) => {
  if (isLoading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-lg font-semibold text-slate-900">Analyzing your game...</p>
        <p className="mt-2 text-sm text-slate-600">Hold tight while KeyGenius generates your ASO snapshot.</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600 shadow-sm">
        <p className="text-lg font-semibold text-slate-900">Your keyword analysis will appear here.</p>
        <p className="mt-3 text-sm">Enter a game name, select a country, and click analyze to see the new Google Play results.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Market Score</h2>
          <p className="mt-4 text-5xl font-bold text-brand-600">{result.market_score.value}</p>
          <p className="mt-2 text-sm text-slate-600">A strong score means better visibility potential in Google Play.</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Competition Score</h2>
          <p className="mt-4 text-5xl font-bold text-slate-900">{result.competition_score.value}</p>
          <p className="mt-2 text-sm text-slate-600">Lower competition is easier to rank against.</p>
        </div>
      </div>

      <RecommendationList names={[result.recommended_name.name]} />

      <div className="flex justify-end">
        <ExportButton gameName={gameName} country={country} result={result} />
      </div>
    </div>
  );
};

export default ResultsCard;
