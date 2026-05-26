import { Compass, Handshake, Lightbulb, Shuffle, type LucideIcon } from "lucide-react";

type TSoftSkillIcon = {
  name: string;
  Icon: LucideIcon;
};

export const SOFT_SKILLS: TSoftSkillIcon[] = [
  { name: "La curiosité", Icon: Compass },
  { name: "L'esprit d'équipe", Icon: Handshake },
  { name: "Résolution de problèmes", Icon: Lightbulb },
  { name: "Adaptabilité", Icon: Shuffle },
];
