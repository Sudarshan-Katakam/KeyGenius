interface RecommendationCardProps {
  recommendedNames: string[];
}

const RecommendationCard = ({ recommendedNames }: RecommendationCardProps) => (
  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
    <h2 className="text-lg font-semibold text-slate-900">Recommended Names</h2>
    <p className="mt-2 text-sm text-slate-600">Keyword-optimized titles tailored for your game concept.</p>
    <div className="mt-5 grid gap-3 sm:grid-cols-2">
      {recommendedNames.map((name) => (
        <div key={name} className="rounded-2xl bg-slate-50 px-4 py-3 text-slate-800">
          {name}
        </div>
      ))}
    </div>
  </div>
);

export default RecommendationCard;
