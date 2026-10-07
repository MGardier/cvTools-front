import { useTranslation } from "react-i18next";

export const HomeIntro = () => {
  const { t } = useTranslation("home");

  return (
    <div className="mb-6 md:mb-8">
      <h1 className="text-[24px] md:text-[32px] font-medium tracking-[-0.02em] text-zinc-900">
        {t("connected.greeting")}
      </h1>
      <p className="mt-1.5 text-[14px] md:text-[15px] text-zinc-500">
        {t("connected.subtitle")}
      </p>
    </div>
  );
};
