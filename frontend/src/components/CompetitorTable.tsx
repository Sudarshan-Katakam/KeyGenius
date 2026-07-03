import { AppInfo } from "../types/App";

interface CompetitorTableProps {
  apps: AppInfo[];
}

const CompetitorTable = ({ apps }: CompetitorTableProps) => (
  <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
    <table className="min-w-full divide-y divide-slate-200 text-sm">
      <thead className="bg-slate-50 text-left text-xs uppercase tracking-[0.18em] text-slate-500">
        <tr>
          <th className="px-4 py-3">App</th>
          <th className="px-4 py-3">Installs</th>
          <th className="px-4 py-3">Rating</th>
          <th className="px-4 py-3">Genre</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100 bg-white">
        {apps.map((app) => (
          <tr key={app.title} className="hover:bg-slate-50">
            <td className="px-4 py-4 font-medium text-slate-900">{app.title}</td>
            <td className="px-4 py-4 text-slate-700">{app.installs}</td>
            <td className="px-4 py-4 text-slate-700">{app.score ?? "—"}</td>
            <td className="px-4 py-4 text-slate-700">{app.genre ?? "N/A"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default CompetitorTable;
