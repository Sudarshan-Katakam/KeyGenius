interface MarketCardProps {
  marketScore: number;
  recommendedKeyword: string;
}

const MarketCard = ({ marketScore, recommendedKeyword }: MarketCardProps) => (
  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
    <h2 className="text-lg font-semibold text-slate-900">Market Score</h2>
    <p className="mt-4 text-5xl font-bold text-brand-600">{marketScore}</p>
    <p className="mt-2 text-sm text-slate-600">Overall strength of the keyword in the selected market.</p>
    <div className="mt-5 rounded-2xl bg-slate-50 px-4 py-4">
      <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Recommended Keyword</p>
      <p className="mt-2 text-2xl font-semibold text-slate-900">{recommendedKeyword}</p>
    </div>
  </div>
);

export default MarketCard;
