import {
  ArrowUpRight,
  Briefcase,
  Code2,
  FolderOpen,
  GraduationCap,
  Heart,
  Users,
} from "lucide-react";

import { BentoCard } from "../components/bento-card";
import { CardHeader } from "../components/card-header";
import { ChapterDivider } from "../components/chapter-divider";
import { ExperienceList } from "../components/experience-list";
import { HeroBentoCard } from "../components/hero-bento-card";
import { IdentityCard } from "../components/identity-card";
import { SoftSkillsList } from "../components/soft-skills-list";
import { StoryPreview } from "../components/story-preview";
import { TechSkillsGrid } from "../components/tech-skills-grid";
import { WelcomeCta } from "../components/welcome-cta";
import { CANDIDATE } from "../data/candidate";
import { SectionId, TestTheme, type TSectionId } from "../types";

type THubViewProps = {
  onNavigate: (sectionId: TSectionId) => void;
};

export const HubView = ({ onNavigate }: THubViewProps) => {
  return (
    <div className="min-h-screen bg-zinc-50 p-3 antialiased md:p-8">
      <div className="mx-auto max-w-4xl space-y-3">
        <IdentityCard>
          <StoryPreview onClick={() => onNavigate(SectionId.HISTOIRE)} />
        </IdentityCard>

        <WelcomeCta onStart={() => onNavigate(SectionId.XP)} />

        <ChapterDivider />

        {/* Row 1 — Hero cards (XP + Tech) — visually emphasised */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <HeroBentoCard onClick={() => onNavigate(SectionId.XP)} action="Explorer" theme={TestTheme.BLUE}>
            <CardHeader
              icon={Briefcase}
              label="Expériences pro"
              description={`${CANDIDATE.experiences.length} missions · startups & agences`}
              readTime="~3 min"
              theme={TestTheme.BLUE}
            />
            <ExperienceList experiences={CANDIDATE.experiences} />
          </HeroBentoCard>

          <HeroBentoCard onClick={() => onNavigate(SectionId.TECH)} action="Plonger" theme={TestTheme.BLUE}>
            <CardHeader
              icon={Code2}
              label="Compétences techniques"
              description="Frontend, backend, DevOps — le stack complet"
              readTime="~1 min"
              theme={TestTheme.BLUE}
            />
            <TechSkillsGrid />
          </HeroBentoCard>
        </div>

        {/* Row 2: Emerald */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <BentoCard onClick={() => onNavigate(SectionId.PROJETS)} action="Découvrir" theme={TestTheme.EMERALD}>
            <CardHeader
              icon={FolderOpen}
              label="Projets personnels"
              description={`${CANDIDATE.projects.length} outils que j'ai forgés moi-même`}
              readTime="~2 min"
              theme={TestTheme.EMERALD}
            />
            <div className="space-y-2">
              {CANDIDATE.projects.map((p) => (
                <div key={p.name} className="flex items-start gap-2">
                  <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                  <div className="min-w-0">
                    <span className="text-xs font-medium text-zinc-600">{p.name}</span>
                    <span className="ml-1.5 text-[11px] text-zinc-400">{p.tech}</span>
                  </div>
                </div>
              ))}
            </div>
          </BentoCard>

          <BentoCard onClick={() => onNavigate(SectionId.SOFT)} action="En savoir plus" theme={TestTheme.EMERALD}>
            <CardHeader
              icon={Users}
              label="Compétences transverses"
              description="Ce qui compte autant que le code"
              readTime="~1 min"
              theme={TestTheme.EMERALD}
            />
            <SoftSkillsList />
          </BentoCard>
        </div>

        {/* Row 3: Zinc */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <BentoCard
            onClick={() => onNavigate(SectionId.FORMATION)}
            action="Voir"
            theme={TestTheme.ZINC}
            className="p-3"
          >
            <CardHeader
              icon={GraduationCap}
              label="Formations"
              description="Du DUT au Master en informatique"
              readTime="~1 min"
              theme={TestTheme.ZINC}
              className="mb-0"
            />
          </BentoCard>

          <BentoCard
            onClick={() => onNavigate(SectionId.PASSIONS)}
            action="Découvrir"
            theme={TestTheme.ZINC}
            className="p-3"
          >
            <CardHeader
              icon={Heart}
              label="Passions"
              description="Ce qui m'anime en dehors du code"
              readTime="~1 min"
              theme={TestTheme.ZINC}
              className="mb-0"
            />
          </BentoCard>
        </div>

        <div className="pt-4 pb-2 text-center">
          <p className="text-[11px] text-zinc-400">
            Créé avec <span className="font-medium text-blue-400">cvTools</span>
          </p>
        </div>
      </div>
    </div>
  );
};
