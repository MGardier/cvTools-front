import type { LucideIcon } from "lucide-react";

export const TestTheme = {
  BLUE: "blue",
  EMERALD: "emerald",
  ZINC: "zinc",
} as const;
export type TTestTheme = (typeof TestTheme)[keyof typeof TestTheme];

export const SectionId = {
  HISTOIRE: "histoire",
  XP: "xp",
  TECH: "tech",
  PROJETS: "projets",
  SOFT: "soft",
  FORMATION: "formation",
  PASSIONS: "passions",
} as const;
export type TSectionId = (typeof SectionId)[keyof typeof SectionId];

export type TExperience = {
  company: string;
  /** Role, e.g. "Développeur Fullstack". */
  role: string;
  /** Period — free-form string, supports ranges: "2025", "2024-2025", "Janv 2023 - Juin 2024"… */
  period: string;
};

export type TProject = {
  name: string;
  tech: string;
};

export type TEducation = {
  degree: string;
  school: string;
  year: string;
};

export type TCandidate = {
  firstName: string;
  lastName: string;
  title: string;
  tagline: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  story: string;
  techSkills: string[];
  experiences: TExperience[];
  projects: TProject[];
  softSkills: string[];
  education: TEducation[];
  passions: string[];
};

export type TSectionMeta = {
  label: string;
  icon: LucideIcon;
  theme: TTestTheme;
};
