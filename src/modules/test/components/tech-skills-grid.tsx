import { TestTheme } from "../types";
import { MiniSkillCard } from "./mini-skill-card";
import { TECH_ICONS } from "./tech-icons";

/**
 * Tech skills grid — 3 columns of mini-cards (icon on top, name below).
 * Used in the hero "Compétences techniques" card on the hub.
 */
export const TechSkillsGrid = () => {
  return (
    <div className="grid grid-cols-3 gap-2">
      {TECH_ICONS.map((tech) => (
        <MiniSkillCard key={tech.name} name={tech.name} theme={TestTheme.BLUE}>
          {tech.svg}
        </MiniSkillCard>
      ))}
    </div>
  );
};
