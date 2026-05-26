import type { TExperience } from "../types";

type TExperienceListProps = {
  experiences: TExperience[];
};

/**
 * Professional experiences as a simple bulleted list — same visual rhythm
 * as the "Passions" / "Soft skills" cards (blue-400 dot) with the typography
 * of the "Formations" card (primary + secondary inline).
 */
export const ExperienceList = ({ experiences }: TExperienceListProps) => {
  return (
    <div className="space-y-2">
      {experiences.map((xp) => (
        <div
          key={`${xp.company}-${xp.period}`}
          className="flex items-center gap-2.5"
        >
          <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
          <div>
            <span className="text-xs font-medium text-zinc-600">{xp.company}</span>
            <span className="ml-1.5 text-[11px] text-zinc-400">
              · {xp.role} · {xp.period}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
