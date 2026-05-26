import { TestTheme, type TTestTheme } from "../types";

type TThemeClasses = {
  iconBg: string;
  iconText: string;
  cardHover: string;
  accentHover: string;
  miniHover: string;
  miniIcon: string;
};

export const themes: Record<TTestTheme, TThemeClasses> = {
  [TestTheme.BLUE]: {
    iconBg: "bg-blue-400",
    iconText: "text-white",
    cardHover: "hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100/60",
    accentHover: "group-hover:text-blue-400",
    miniHover: "hover:border-blue-200 hover:bg-blue-50/40",
    miniIcon: "text-blue-400",
  },
  [TestTheme.EMERALD]: {
    iconBg: "bg-emerald-400",
    iconText: "text-white",
    cardHover: "hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-100/60",
    accentHover: "group-hover:text-emerald-500",
    miniHover: "hover:border-emerald-200 hover:bg-emerald-50/40",
    miniIcon: "text-emerald-500",
  },
  [TestTheme.ZINC]: {
    iconBg: "bg-zinc-400",
    iconText: "text-white",
    cardHover: "hover:border-zinc-300 hover:shadow-lg hover:shadow-zinc-100/60",
    accentHover: "group-hover:text-zinc-600",
    miniHover: "hover:border-zinc-200 hover:bg-zinc-50/40",
    miniIcon: "text-zinc-500",
  },
};
