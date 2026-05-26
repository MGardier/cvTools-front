import {
  BookOpen,
  Briefcase,
  Code2,
  FolderOpen,
  GraduationCap,
  Heart,
  Users,
} from "lucide-react";

import {
  SectionId,
  TestTheme,
  type TSectionId,
  type TSectionMeta,
} from "../types";

export const SECTIONS: Record<TSectionId, TSectionMeta> = {
  [SectionId.HISTOIRE]: { label: "Mon histoire", icon: BookOpen, theme: TestTheme.BLUE },
  [SectionId.XP]: { label: "Expériences pro", icon: Briefcase, theme: TestTheme.BLUE },
  [SectionId.TECH]: { label: "Compétences techniques", icon: Code2, theme: TestTheme.BLUE },
  [SectionId.PROJETS]: { label: "Projets personnels", icon: FolderOpen, theme: TestTheme.EMERALD },
  [SectionId.SOFT]: { label: "Compétences transverses", icon: Users, theme: TestTheme.EMERALD },
  [SectionId.FORMATION]: { label: "Formations", icon: GraduationCap, theme: TestTheme.ZINC },
  [SectionId.PASSIONS]: { label: "Passions", icon: Heart, theme: TestTheme.ZINC },
};

export const isValidSectionId = (id: string | undefined): id is TSectionId => {
  return !!id && id in SECTIONS;
};
