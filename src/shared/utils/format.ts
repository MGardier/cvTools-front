const toK = (value: number): string => {
  const k = Math.round(value / 1000);
  return `${k}k`;
};

export const formatSalary = (
  salaryMin: number | null,
  salaryMax: number | null,
  fallback: string
): string => {
  if (salaryMin === null && salaryMax === null) return fallback;
  if (salaryMin !== null && salaryMax !== null) return `${toK(salaryMin)} - ${toK(salaryMax)}`;
  if (salaryMin !== null) return toK(salaryMin);
  return toK(salaryMax!);
};

export const formatRelativeDate = (
  dateString: string,
  locale: string = "fr"
): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  // Today → show time (e.g. "14:30")
  if (diffDays === 0) {
    return new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit" }).format(date);
  }

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });

  // Within the month → "il y a X jours"
  if (diffDays < 30) return rtf.format(-diffDays, "day");

  // Beyond → "il y a X mois"
  return rtf.format(-Math.floor(diffDays / 30), "month");
};

export const formatRelativePublishedDate = (
  dateString: string,
  locale: string = "fr"
): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });

  // Aujourd'hui
  if (diffDays === 0) return rtf.format(0, "day");

  // < 7 jours → "hier", "il y a X jours"
  if (diffDays < 7) return rtf.format(-diffDays, "day");

  // < 30 jours → "il y a X semaines"
  const diffWeeks = Math.floor(diffDays / 7);
  if (diffDays < 30) return rtf.format(-diffWeeks, "week");

  // >= 30 jours → "il y a X mois"
  return rtf.format(-Math.floor(diffDays / 30), "month");
};
