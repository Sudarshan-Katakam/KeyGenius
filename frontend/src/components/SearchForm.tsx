import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { SearchRequest } from "../types/SearchResult";

interface SearchFormProps {
  onAnalyze: (data: SearchRequest) => void;
  isLoading: boolean;
}

const countries = [
  { label: "United States", value: "US" },
  { label: "India", value: "IN" },
  { label: "United Kingdom", value: "GB" },
  { label: "Brazil", value: "BR" },
  { label: "Canada", value: "CA" }
];

const SearchForm = ({ onAnalyze, isLoading }: SearchFormProps) => {
  const { register, handleSubmit, reset, formState } = useForm<SearchRequest>({
    defaultValues: {
      gameName: "carrom",
      country: "IN"
    }
  });

  const submitHandler = (data: SearchRequest) => {
    onAnalyze(data);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <label htmlFor="gameName" className="block text-sm font-medium text-slate-700">
          Game Name
        </label>
        <input
          id="gameName"
          {...register("gameName", { required: true })}
          className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          placeholder="Enter your game name"
        />
        {formState.errors.gameName && <p className="mt-2 text-sm text-red-600">Game name is required.</p>}
      </div>

      <div>
        <label htmlFor="country" className="block text-sm font-medium text-slate-700">
          Country
        </label>
        <select
          id="country"
          {...register("country", { required: true })}
          className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
        >
          {countries.map((country) => (
            <option key={country.value} value={country.value}>
              {country.label}
            </option>
          ))}
        </select>
        {formState.errors.country && <p className="mt-2 text-sm text-red-600">Please select a country.</p>}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center justify-center rounded-2xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...
            </>
          ) : (
            "Analyze"
          )}
        </button>
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
