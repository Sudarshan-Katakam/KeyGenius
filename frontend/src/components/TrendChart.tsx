interface TrendChartProps {
  values: number[];
}

const TrendChart = ({ values }: TrendChartProps) => {
  if (!values.length) {
    return <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">No trend history available yet.</div>;
  }

  const max = Math.max(...values, 1);
  const width = 320;
  const height = 140;
  const points = values
    .map((value, index) => {
      const x = (index / Math.max(values.length - 1, 1)) * (width - 24) + 12;
      const y = height - (value / max) * (height - 24) - 12;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-40 w-full">
        <line x1="12" y1={height - 12} x2={width - 12} y2={height - 12} stroke="#cbd5e1" strokeWidth="1" />
        <polyline fill="none" stroke="#2563eb" strokeWidth="3" points={points} />
        {values.map((value, index) => {
          const x = (index / Math.max(values.length - 1, 1)) * (width - 24) + 12;
          const y = height - (value / max) * (height - 24) - 12;
          return <circle key={`${value}-${index}`} cx={x} cy={y} r="4" fill="#2563eb" />;
        })}
      </svg>
    </div>
  );
};

export default TrendChart;
