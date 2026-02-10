import { GitHubLogo } from "@/shared/components/logo/github-logo";
import { GoogleLogo } from "@/shared/components/logo/google-logo";
import { Button } from "@/shared/components/ui/button";
import { useTranslation } from "react-i18next";

// TODO : ajout d'un loader
export const AuthSocialMedia = () => {
  const { t } = useTranslation("auth");
  const githubOauth = () =>
    (window.location.href = `${import.meta.env.VITE_API_BASE_URL}auth/github`);
  const googleOauth = () =>
    (window.location.href = `${import.meta.env.VITE_API_BASE_URL}auth/google`);

  return (
    <div className="flex  lg:flex-row  md:flex-row flex-col  gap-4 items-center justify-center">
      <Button
        onClick={githubOauth}
        variant="outline"
        className="w-full lg:max-w-min md:max-w-min"
        size="form"
        type="button"
      >
        <GitHubLogo size={22} />
        {t("pages.socialMedia.github")}
      </Button>
      <Button
        onClick={googleOauth}
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
