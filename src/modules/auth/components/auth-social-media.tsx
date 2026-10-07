import { GitHubLogo } from "@/shared/components/logo/github-logo";
import { GoogleLogo } from "@/shared/components/logo/google-logo";
import { Button } from "@/shared/components/ui/button";
import { useTranslation } from "react-i18next";

import { EOauthProvider, startOauthFlow } from "@/modules/auth/utils/oauth";

// TODO : ajout d'un loader
export const AuthSocialMedia = () => {
  const { t } = useTranslation("auth");

  return (
    <div className="flex  lg:flex-row  md:flex-row flex-col  gap-4 items-center justify-center">
      <Button
        onClick={() => startOauthFlow(EOauthProvider.GITHUB)}
        variant="outline"
        className="w-full lg:max-w-min md:max-w-min"
        size="form"
        type="button"
      >
        <GitHubLogo size={22} />
        {t("pages.socialMedia.github")}
      </Button>
      <Button
        onClick={() => startOauthFlow(EOauthProvider.GOOGLE)}
        variant="outline"
        className="w-full lg:max-w-min md:max-w-min"
        size="form"
        type="button"
      >
        <GoogleLogo size={22} />
        {t("pages.socialMedia.google")}
      </Button>
    </div>
  );
};
