import type { TOauthProvider } from "@/modules/auth/utils/oauth";

// Admin OAuth flow: unlike the user flow, it carries the invitation token so the
// backend can bind the OAuth identity to the pending admin invitation.
export const startAdminOauthFlow = (
  provider: TOauthProvider,
  token: string,
): void => {
  window.location.href = `${import.meta.env.VITE_API_BASE_URL}auth/admin/oauth/${provider}?token=${encodeURIComponent(token)}`;
};
