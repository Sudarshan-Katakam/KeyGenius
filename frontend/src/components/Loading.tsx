const Loading = () => (
  <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-600">
      <svg className="h-8 w-8 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
        <path d="M22 12a10 10 0 0 1-10 10" strokeLinecap="round" />
      </svg>
    </div>
    <p className="mt-6 text-lg font-semibold text-slate-900">Analyzing Google Play data...</p>
    <p className="mt-2 text-sm text-slate-600">Fetching trends, competitor apps, and keyword intelligence.</p>
  </div>
);

export default Loading;
