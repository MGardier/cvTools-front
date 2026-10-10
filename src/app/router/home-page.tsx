import { useCallback, Suspense } from "react";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "@/app/constants/routes";
import { useMe } from "@/shared/hooks/useMe";
import { RouteLoader } from "@/shared/components/route-loader";
import { lazyNamed } from "@/shared/utils/lazy";
import { EOauthProvider, startOauthFlow } from "@/modules/auth/utils/oauth";

import { HomePageUi } from "./home-page.ui";

// Lazy-loaded: keeps the connected dashboard out of the public landing bundle.
const ConnectedHome = lazyNamed(
  () => import("@/modules/home/connected-home"),
  "ConnectedHome",
);

export const HomePage = () => {
  const navigate = useNavigate();
  const { user, isPending } = useMe();

  const handleGoogleOauth = useCallback(() => {
    startOauthFlow(EOauthProvider.GOOGLE);
  }, []);

  const handleGithubOauth = useCallback(() => {
    startOauthFlow(EOauthProvider.GITHUB);
  }, []);

  const handleEmailSignUp = useCallback(() => {
    navigate(ROUTES.auth.signUp);
  }, [navigate]);

  if (isPending) return <RouteLoader />;
  if (user)
    return (
      <Suspense fallback={<RouteLoader />}>
        <ConnectedHome />
      </Suspense>
    );

  return (
    <HomePageUi
      onGoogleOauth={handleGoogleOauth}
      onGithubOauth={handleGithubOauth}
      onEmailSignUp={handleEmailSignUp}
    />
  );
};
