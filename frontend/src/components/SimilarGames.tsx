import { Sparkles } from "lucide-react";
import { AppInfo } from "../types/App";

interface SimilarGamesProps {
  apps: AppInfo[];
}

const SimilarGames = ({ apps }: SimilarGamesProps) => (
  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
    <div className="flex items-center gap-2">
      <Sparkles className="h-5 w-5 text-brand-500" />
      <h3 className="text-lg font-semibold text-slate-900">Similar Games</h3>
    </div>
    <div className="mt-5 space-y-3">
      {apps.map((app) => (
        <div key={app.title} className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-medium text-slate-900">{app.title}</p>
              <p className="text-sm text-slate-600">{app.developer ?? "Independent"}</p>
            </div>
            <div className="text-sm font-semibold text-slate-700">{app.installs}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default SimilarGames;
