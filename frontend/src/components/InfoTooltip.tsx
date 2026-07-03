import { Info } from "lucide-react";

interface InfoTooltipProps {
  title: string;
  description: string;
}

const InfoTooltip = ({ title, description }: InfoTooltipProps) => (
  <div className="group relative inline-flex">
    <Info className="h-4 w-4 text-slate-400" />
    <div className="pointer-events-none absolute left-1/2 top-6 z-10 hidden w-56 -translate-x-1/2 rounded-2xl border border-slate-200 bg-white p-3 text-sm text-slate-600 shadow-lg group-hover:block">
      <p className="font-semibold text-slate-900">{title}</p>
      <p className="mt-1">{description}</p>
    </div>
  </div>
);

export default InfoTooltip;
