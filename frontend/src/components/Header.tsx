import { Sparkles } from "lucide-react";

const Header = () => (
  <header className="max-w-6xl mx-auto px-4 py-8 sm:px-6">
    <div className="rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-sm backdrop-blur-xl">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            KeyGenius
          </h1>
          <p className="mt-3 max-w-2xl text-base text-slate-600 sm:text-lg">
            Google Play ASO intelligence for indie game developers.
          </p>
        </div>
      </div>
    </div>
  </header>
);

export default Header;
