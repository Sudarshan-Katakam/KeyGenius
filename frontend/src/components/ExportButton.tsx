import { Download } from "lucide-react";
import { SearchResult } from "../types/SearchResult";

interface ExportButtonProps {
  gameName: string;
  country: string;
  result: SearchResult | null;
}

const ExportButton = ({ gameName, country, result }: ExportButtonProps) => {
  const downloadFile = (content: string, fileName: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleExport = (format: "csv" | "json" | "excel") => {
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
      ["Game Name", "Country", "Keyword", "Trend Score", "Momentum", "Relevancy", "Popularity", "Final Score", "Competition Score", "Market Score"],
      [
        gameName,
        country,
        keywordRow.keyword,
        keywordRow.trend_score.toString(),
        keywordRow.momentum.toString(),
        keywordRow.relevancy.toString(),
        keywordRow.popularity.toString(),
        keywordRow.final_score.toString(),
        result.competition_score.value.toString(),
        result.market_score.value.toString(),
      ],
    ];

    const csvContent = rows.map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")).join("\n");
    const baseName = `keygenius-${gameName.toLowerCase().replace(/\s+/g, "-") || "results"}`;

    if (format === "csv") {
      downloadFile(csvContent, `${baseName}.csv`, "text/csv;charset=utf-8;");
    } else if (format === "json") {
      downloadFile(JSON.stringify(result, null, 2), `${baseName}.json`, "application/json;charset=utf-8;");
    } else {
      downloadFile(csvContent, `${baseName}.xlsx`, "application/vnd.ms-excel;charset=utf-8;");
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button onClick={() => handleExport("csv")} disabled={!result} className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50">
        <Download className="h-4 w-4" /> CSV
      </button>
      <button onClick={() => handleExport("json")} disabled={!result} className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 disabled:cursor-not-allowed disabled:opacity-50">
        <Download className="h-4 w-4" /> JSON
      </button>
      <button onClick={() => handleExport("excel")} disabled={!result} className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 disabled:cursor-not-allowed disabled:opacity-50">
        <Download className="h-4 w-4" /> Excel
      </button>
    </div>
  );
};

export default ExportButton;
