import { KeywordAnalysis } from "../types/Keyword";

interface KeywordTableProps {
  keywords: KeywordAnalysis[];
}

const KeywordTable = ({ keywords }: KeywordTableProps) => (
  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
    <div className="flex items-center justify-between gap-4">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Keyword Analysis</h2>
        <p className="mt-2 text-sm text-slate-600">Detailed keyword ratings from Trends and relevance.</p>
      </div>
    </div>

    <div className="mt-6 overflow-hidden rounded-3xl border border-slate-100">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50 text-left text-xs uppercase tracking-[0.18em] text-slate-500">
          <tr>
            <th className="px-4 py-3">Keyword</th>
            <th className="px-4 py-3">Trend Score</th>
            <th className="px-4 py-3">Momentum</th>
            <th className="px-4 py-3">Relevancy</th>
            <th className="px-4 py-3">Popularity</th>
            <th className="px-4 py-3">Final Score</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {keywords.map((keyword) => (
            <tr key={keyword.keyword} className="hover:bg-slate-50">
              <td className="whitespace-nowrap px-4 py-4 font-medium text-slate-900">{keyword.keyword}</td>
              <td className="px-4 py-4 text-slate-700">{keyword.trend_score}</td>
              <td className="px-4 py-4 text-slate-700">{keyword.momentum}</td>
              <td className="px-4 py-4 text-slate-700">{keyword.relevancy}%</td>
              <td className="px-4 py-4 text-slate-700">{keyword.popularity}</td>
              <td className="px-4 py-4 font-semibold text-slate-900">{keyword.final_score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default KeywordTable;
