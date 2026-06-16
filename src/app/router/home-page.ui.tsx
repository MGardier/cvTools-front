import { useTranslation } from "react-i18next";
import {
  Search,
  Folders,
  Sparkles,
  FileText,
  CheckSquare,
  Activity,
  Mail,
} from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { GitHubLogo } from "@/shared/components/logo/github-logo";
import { GoogleLogo } from "@/shared/components/logo/google-logo";
import { OfferTableFilters } from "@/modules/offer/components/offer-table-filters";

import type { IOfferSearchFilters } from "@/modules/offer/types";

interface IHomePageUiProps {
  stagedFilters: IOfferSearchFilters;
  onStagedChange: (partial: Partial<IOfferSearchFilters>) => void;
  onSearch: () => void;
  onRemoveFilter: (key: keyof IOfferSearchFilters) => void;
  onClearFilters: () => void;
  cityResetKey: number;
  onGoogleOauth: () => void;
  onGithubOauth: () => void;
  onEmailSignUp: () => void;
}

const DECORATIVE_CHIP_KEYS = [
  "contractType",
  "remote",
  "experience",
  "publishedSince",
] as const;

const FEATURE_KEYS = ["aiExtraction", "notes", "tasks", "status"] as const;

const FEATURE_ICONS: Record<(typeof FEATURE_KEYS)[number], typeof Sparkles> = {
  aiExtraction: Sparkles,
  notes: FileText,
  tasks: CheckSquare,
  status: Activity,
};

export const HomePageUi = ({
  stagedFilters,
  onStagedChange,
  onSearch,
  onRemoveFilter,
  onClearFilters,
  cityResetKey,
  onGoogleOauth,
  onGithubOauth,
  onEmailSignUp,
}: IHomePageUiProps) => {
  const { t } = useTranslation("home");

  return (
    <section className="px-4 sm:px-6 lg:px-8 pt-24 md:pt-28 pb-16 md:pb-20">
      <div className="max-w-[880px] mx-auto">
        {/* ── Intro ── */}
        <div className="text-center mb-8 md:mb-10">
          <h1 className="text-[26px] md:text-[36px] lg:text-[42px] font-medium tracking-[-0.03em] leading-[1.15] mb-3 md:mb-4">
            {t("intro.title")}
          </h1>
          <p className="text-zinc-500 text-[14px] md:text-[16px] leading-[1.55] max-w-[520px] mx-auto">
            {t("intro.tagline")}
          </p>
        </div>

        <div className="flex flex-col gap-4 md:gap-5">
          {/* ── Search card ── */}
          <div className="rounded-2xl border border-zinc-200 p-4 md:p-6 bg-white">
            <div className="flex items-center gap-2 mb-1.5 md:mb-2">
              <Search className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
              <h2 className="text-[14px] md:text-[16px] font-medium text-zinc-900">
                {t("search.title")}
              </h2>
              <span className="text-[10px] md:text-[11px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-medium">
                {t("search.badge")}
              </span>
            </div>
            <p className="text-[12px] md:text-[13px] text-zinc-500 leading-relaxed mb-3 md:mb-4">
              {t("search.description")}
            </p>

            <OfferTableFilters
              stagedFilters={stagedFilters}
              committedFilters={stagedFilters}
              onStagedChange={onStagedChange}
              onSearch={onSearch}
              onRemoveFilter={onRemoveFilter}
              onClearFilters={onClearFilters}
              hasActiveFilters={false}
              cityResetKey={cityResetKey}
              hideAdvancedFilters
            />

            {/* Decorative chips */}
            <div className="flex flex-wrap gap-1.5 mt-3 md:mt-4">
              {DECORATIVE_CHIP_KEYS.map((key) => (
                <span
                  key={key}
                  className="text-[11px] px-2.5 py-1 rounded-full border border-zinc-200 text-zinc-500"
                >
                  {t(`search.chips.${key}`)}
                </span>
              ))}
            </div>
          </div>

          {/* ── Candidatures card ── */}
          <div className="rounded-2xl border border-zinc-200 p-4 md:p-6 bg-white">
            <div className="flex items-center gap-2 mb-1.5 md:mb-2">
              <Folders className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
              <h2 className="text-[14px] md:text-[16px] font-medium text-zinc-900">
                {t("applications.title")}
              </h2>
              <span className="text-[10px] md:text-[11px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-500 font-medium">
                {t("applications.badge")}
              </span>
            </div>
            <p className="text-[12px] md:text-[13px] text-zinc-500 leading-relaxed mb-4 md:mb-5">
              {t("applications.description")}
            </p>

            {/* Features grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mb-5 md:mb-6">
              {FEATURE_KEYS.map((key) => {
                const Icon = FEATURE_ICONS[key];
                return (
                  <div
                    key={key}
                    className="flex items-start gap-3 p-3 rounded-lg md:bg-zinc-50"
                  >
                    <div className="w-8 h-8 rounded-md bg-blue-50 text-blue-400 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-[12px] md:text-[13px] font-medium text-zinc-900 mb-0.5">
                        {t(`applications.features.${key}.title`)}
                      </h3>
                      <p className="text-[11px] md:text-[12px] text-zinc-500 leading-snug">
                        {t(`applications.features.${key}.description`)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-zinc-200 pt-3 md:pt-4">
              <p className="text-[12px] md:text-[13px] text-zinc-500 mb-2.5 md:mb-3">
                {t("applications.auth.label")}
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onGoogleOauth}
                  className="flex-1 h-10"
                >
                  <GoogleLogo size={18} />
                  {t("applications.auth.google")}
                </Button>
                <Button
                  type="button"
                  onClick={onGithubOauth}
                  className="flex-1 h-10 bg-zinc-900 hover:bg-zinc-800 text-white"
                >
                  <GitHubLogo size={18} />
                  {t("applications.auth.github")}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onEmailSignUp}
                  className="flex-1 h-10"
                >
                  <Mail className="w-4 h-4" />
                  {t("applications.auth.email")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
