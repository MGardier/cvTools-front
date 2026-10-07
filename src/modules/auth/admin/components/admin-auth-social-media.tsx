import { GitHubLogo } from "@/shared/components/logo/github-logo";
import { GoogleLogo } from "@/shared/components/logo/google-logo";
import { Button } from "@/shared/components/ui/button";
import { useTranslation } from "react-i18next";

import { EOauthProvider } from "@/modules/auth/utils/oauth";
import { startAdminOauthFlow } from "@/modules/auth/admin/utils/admin-oauth";

interface IAdminAuthSocialMediaProps {
  token: string;
}

export const AdminAuthSocialMedia = ({ token }: IAdminAuthSocialMediaProps) => {
  const { t } = useTranslation("auth");

  return (
    <div className="flex  lg:flex-row  md:flex-row flex-col  gap-4 items-center justify-center">
      <Button
        onClick={() => startAdminOauthFlow(EOauthProvider.GITHUB, token)}
        variant="outline"
        className="w-full lg:max-w-min md:max-w-min"
        size="form"
        type="button"
      >
        <GitHubLogo size={22} />
        {t("pages.socialMedia.github")}
      </Button>
      <Button
        onClick={() => startAdminOauthFlow(EOauthProvider.GOOGLE, token)}
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
