import { useTranslation } from "react-i18next";
import type { FallbackProps } from "react-error-boundary";
import { Button } from "@/shared/components/ui/button";

const CHUNK_ERROR_PATTERNS = [
  "ChunkLoadError",
  "Failed to fetch dynamically imported module",
  "Importing a module script failed",
  "error loading dynamically imported module",
];

const isChunkLoadError = (error: unknown) => {
  if (!(error instanceof Error)) return false;
  const haystack = `${error.name} ${error.message}`;
  return CHUNK_ERROR_PATTERNS.some((pattern) => haystack.includes(pattern));
};

export const ChunkErrorFallback = ({
  error,
  resetErrorBoundary,
}: FallbackProps) => {
  const { t } = useTranslation("common", { useSuspense: false });
  const isChunk = isChunkLoadError(error);

  const title = isChunk
    ? t("errors.chunkLoad.title")
    : t("errors.generic.title");
  const description = isChunk
    ? t("errors.chunkLoad.description")
    : t("errors.generic.description");
  const action = isChunk
    ? t("errors.chunkLoad.reload")
    : t("errors.generic.retry");
  const onClick = isChunk
    ? () => window.location.reload()
    : resetErrorBoundary;

  return (
    <div
      role="alert"
      className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-4 px-4 text-center"
    >
      <h1 className="font-display text-2xl font-semibold tracking-tight">
        {title}
      </h1>
      <p className="max-w-md text-sm text-muted-foreground">{description}</p>
      <Button onClick={onClick}>{action}</Button>
    </div>
  );
};
