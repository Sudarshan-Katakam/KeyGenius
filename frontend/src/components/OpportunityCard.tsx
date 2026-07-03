import { Compass } from "lucide-react";
import InfoTooltip from "./InfoTooltip";

interface OpportunityCardProps {
  value: number;
}

const OpportunityCard = ({ value }: OpportunityCardProps) => (
  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">Opportunity Score</h3>
        <p className="mt-2 text-sm text-slate-600">Weighted signal for market entry potential.</p>
      </div>
      <InfoTooltip title="Opportunity" description="Combines demand, momentum, and competition to surface likely openings." />
    </div>
    <div className="mt-6 flex items-center gap-3">
      <div className="rounded-2xl bg-brand-50 p-3 text-brand-600">
        <Compass className="h-6 w-6" />
      </div>
      <div className="text-4xl font-bold text-slate-900">{value}</div>
    </div>
  </div>
);

export default OpportunityCard;
