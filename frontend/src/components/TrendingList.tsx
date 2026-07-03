interface TrendingListProps {
  names: string[];
}

const TrendingList = ({ names }: TrendingListProps) => (
  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
    <h2 className="text-lg font-semibold text-slate-900">Trending Names</h2>
    <p className="mt-2 text-sm text-slate-600">Popular name variations that are gaining attention.</p>
    <ul className="mt-5 space-y-3">
      {names.map((name) => (
        <li key={name} className="rounded-2xl bg-slate-50 px-4 py-3 text-slate-800">
          {name}
        </li>
      ))}
    </ul>
  </div>
);

export default TrendingList;
