import { TrendingUp } from "lucide-react";
import InfoTooltip from "./InfoTooltip";
import { MetricInsight } from "../types/SearchResult";

interface PopularityCardProps {
  metric: MetricInsight;
}

const PopularityCard = ({ metric }: PopularityCardProps) => (
  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">Popularity Score</h3>
        <p className="mt-2 text-sm text-slate-600">Search demand and trend stability summary.</p>
      </div>
      <InfoTooltip title="Popularity" description="How strong the keyword demand looks over the recent trend window." />
    </div>
    <div className="mt-6 flex items-end gap-3">
      <div className="text-4xl font-bold text-slate-900">{metric.value}</div>
      <div className="rounded-full bg-emerald-50 p-2 text-emerald-600">
        <TrendingUp className="h-4 w-4" />
      </div>
    </div>
    <ul className="mt-5 space-y-2 text-sm text-slate-600">
      {metric.explanation.map((item) => (
        <li key={item} className="flex gap-2">
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-500" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default PopularityCard;
