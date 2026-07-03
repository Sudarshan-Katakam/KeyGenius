interface CompetitionCardProps {
  competitionScore: number;
  competitionLevel: string;
}

const CompetitionCard = ({ competitionScore, competitionLevel }: CompetitionCardProps) => (
  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
    <h2 className="text-lg font-semibold text-slate-900">Competition Score</h2>
    <p className="mt-4 text-5xl font-bold text-slate-900">{competitionScore}</p>
    <p className="mt-2 text-sm uppercase tracking-[0.18em] text-slate-500">{competitionLevel}</p>
    <p className="mt-4 text-sm text-slate-600">
      A higher competition score means more rival apps are active in the same keyword space.
    </p>
  </div>
);

export default CompetitionCard;
