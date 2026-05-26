import { SOFT_SKILLS } from "./soft-skills-icons";

/**
 * Soft skills as a compact vertical list — small Lucide icon + skill name
 * per row. Used in the "Compétences transverses" card on the hub (emerald).
 */
export const SoftSkillsList = () => {
  return (
    <div className="space-y-1.5">
      {SOFT_SKILLS.map(({ name, Icon }) => (
        <div key={name} className="flex items-center gap-2">
          <Icon className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
          <span className="text-xs font-medium text-zinc-600">{name}</span>
        </div>
      ))}
    </div>
  );
};
