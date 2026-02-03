import { ROUTES } from "@/common/data/routes";
import { AuthLayout } from "@/features/auth/components/auth-layout";
import { GetOauthSession } from "@/features/auth/components/get-oauth-session";


import { useNavigate, useSearchParams } from "react-router-dom";

export function GetOauthSessionPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("sessionId");
  const loginMethod = searchParams.get("loginMethod");
  if (!sessionId || !loginMethod) {
    navigate(
      `${ROUTES.auth.signIn}?errorCode=${loginMethod}_COMPLETED_OAUTH_FAILED`
    );
    return;
  }

  return <AuthLayout>
    <GetOauthSession {...{loginMethod,sessionId}}/>
  </AuthLayout>
}
