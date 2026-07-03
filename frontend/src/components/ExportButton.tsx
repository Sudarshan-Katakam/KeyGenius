import { Download } from "lucide-react";
import { SearchResult } from "../types/SearchResult";

interface ExportButtonProps {
  gameName: string;
  country: string;
  result: SearchResult | null;
}

const ExportButton = ({ gameName, country, result }: ExportButtonProps) => {
  const handleExport = () => {
    if (!result) return;

    const keywordRow = result.keywords[0] || {
      keyword: "",
      trend_score: 0,
      momentum: 0,
      relevancy: 0,
      popularity: 0,
      final_score: 0,
    };

    const rows = [
      [
        "Game Name",
        "Country",
        "Keyword",
        "Trend Score",
        "Momentum",
        "Relevancy",
        "Popularity",
        "Final Score",
        "Competition Score",
        "Market Score"
      ],
      [
        gameName,
        country,
        keywordRow.keyword,
        keywordRow.trend_score.toString(),
        keywordRow.momentum.toString(),
        keywordRow.relevancy.toString(),
        keywordRow.popularity.toString(),
        keywordRow.final_score.toString(),
        result.competition_score.toString(),
        result.market_score.toString()
      ]
    ];

    const csvContent = rows.map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `keygenius-${gameName.toLowerCase().replace(/\s+/g, "-") || "results"}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleExport}
      disabled={!result}
      className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Download className="h-4 w-4" /> Export CSV
    </button>
  );
};

export default ExportButton;
