import { AppInfo } from "../types/App";

interface AppCardProps {
  app: AppInfo;
}

const AppCard = ({ app }: AppCardProps) => (
  <a href={app.url ?? "#"} target="_blank" rel="noreferrer" className="group block rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
    <div className="flex items-center gap-4">
      <div className="h-14 w-14 overflow-hidden rounded-2xl bg-slate-100">
        {app.icon ? <img src={app.icon} alt={app.title} className="h-full w-full object-cover" /> : null}
      </div>
      <div>
        <h3 className="text-base font-semibold text-slate-900">{app.title}</h3>
        <p className="text-sm text-slate-600">{app.developer}</p>
      </div>
    </div>
    <div className="mt-4 grid gap-2 text-sm text-slate-600 sm:grid-cols-3">
      <p><span className="font-semibold text-slate-900">Rating:</span> {app.score ?? "—"}</p>
      <p><span className="font-semibold text-slate-900">Installs:</span> {app.installs}</p>
      <p><span className="font-semibold text-slate-900">Genre:</span> {app.genre ?? "N/A"}</p>
    </div>
  </a>
);

export default AppCard;
