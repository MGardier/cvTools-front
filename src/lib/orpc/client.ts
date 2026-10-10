import { createORPCClient, ORPCError } from "@orpc/client";
import { OpenAPILink } from "@orpc/openapi-client/fetch";
import { contract, type TContractClient } from "@cvtools/contracts";
import { endSession, refreshSession } from "@/lib/auth/refresh-session";

const REQUEST_TIMEOUT_MS = 10_000; // 10 seconds

// No refresh attempt on auth routes (a 401 there is a real authentication failure).
const AUTH_ROUTE_KEYS = ["auth", "admin"];

const link = new OpenAPILink(contract, {
  // Contract paths are absolute ("/auth/me"): drop the trailing slash of the base URL.
  url: import.meta.env.VITE_API_BASE_URL.replace(/\/$/, ""),
  fetch: (request, init) =>
    globalThis.fetch(request, {
      ...init,
      credentials: "include",
      signal: AbortSignal.any([
        request.signal,
        AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      ]),
    }),
  interceptors: [
    // 401 → refresh the session once, then replay the call.
    async ({ next, path }) => {
      try {
        return await next();
      } catch (error) {
        const isAuthRoute = AUTH_ROUTE_KEYS.includes(path[0]);
        if (!(error instanceof ORPCError) || error.status !== 401 || isAuthRoute) {
          throw error;
        }
        if (await refreshSession()) {
          return next();
        }
        endSession();
        throw error;
      }
    },
  ],
});

/** Typed client of every @cvtools/contracts route. Errors are thrown as `ORPCError`. */
export const orpcClient: TContractClient = createORPCClient(link);
