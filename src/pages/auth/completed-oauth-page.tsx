import { ROUTES } from "@/data/routes";
import { AuthLayout } from "@/features/auth/components/auth-layout";
import { CompletedOauth } from "@/features/auth/components/complete-oauth";

import { useNavigate, useSearchParams } from "react-router-dom";

export function CompletedOauthPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const oauthId = searchParams.get("oauthId");
  const loginMethod = searchParams.get("loginMethod");
  if (!oauthId || !loginMethod) {
    navigate(
      `${ROUTES.auth.signIn}?errorCode=${loginMethod}_COMPLETED_OAUTH_FAILED`
    );
    return;
  }

  return <AuthLayout>
    <CompletedOauth {...{loginMethod,oauthId}}/>
  </AuthLayout>
}
