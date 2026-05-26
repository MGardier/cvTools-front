import { ArrowRight, Sparkles } from "lucide-react";

type TWelcomeCtaProps = {
  onStart: () => void;
};

export const WelcomeCta = ({ onStart }: TWelcomeCtaProps) => {
  return (
    <div className="py-4 text-center md:py-6">
      <h1 className="text-2xl font-medium tracking-tight text-zinc-900 md:text-3xl">
        Bienvenue sur mon CV interactif
      </h1>
      <p className="mx-auto mt-2 max-w-[450px] text-[13px] leading-relaxed text-zinc-400 md:text-sm">
        10 min pour me connaître — suivez le parcours guidé ou choisissez directement un chapitre.
      </p>
      <button
        type="button"
        onClick={onStart}
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-blue-400 px-6 py-3 text-[13px] font-medium text-white shadow-lg shadow-blue-200 transition-all duration-200 hover:scale-[1.02] hover:bg-blue-500 active:scale-[0.98]"
      >
        <Sparkles className="h-4 w-4" />
        Commencer le parcours
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
};
