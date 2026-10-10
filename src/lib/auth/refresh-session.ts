import { ROUTES } from "@/app/constants/routes";
import { ME_QUERY_KEY } from "@/shared/hooks/useMe";
import { queryClient } from "@/lib/tanstack-query/query-client";

let refreshInFlight: Promise<boolean> | null = null;

/**
 * Refreshes the session cookies. Single-flight: concurrent 401s share the same
 * refresh request, so the refresh token is rotated once.
 * Resolves `true` when the session was refreshed.
 */
export const refreshSession = (): Promise<boolean> => {
  refreshInFlight ??= fetch(`${import.meta.env.VITE_API_BASE_URL}auth/refresh`, {
    method: "POST",
    credentials: "include",
  })
    .then((response) => response.ok)
    .catch(() => false)
    .finally(() => {
      refreshInFlight = null;
    });

  return refreshInFlight;
};

/** Unrecoverable 401: clears the auth identity and redirects to sign-in. */
export const endSession = (): void => {
  queryClient.removeQueries({ queryKey: ME_QUERY_KEY });
  window.location.href = ROUTES.auth.signIn;
};
