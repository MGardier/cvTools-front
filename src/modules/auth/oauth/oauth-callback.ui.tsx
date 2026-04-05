import { Card } from "@/shared/components/ui/card";
import { FormCardHeader } from "@/shared/components/form/form-card-header";
import { FormLayout } from "@/shared/components/form/form-layout";
import type { TFunction } from "i18next";

interface IOauthCallbackUiProps {
  isPending: boolean;
  loginMethod: string;
  t: TFunction<'auth', undefined>;
}

export const OauthCallbackUi = ({ isPending, loginMethod, t }: IOauthCallbackUiProps) => {
    return (
        <FormLayout>
            <Card className="border-0 shadow-none w-full max-w-sm md:max-w-md lg:max-w-lg">
                <FormCardHeader title={`${t("pages.oauthCallback.title")} ${loginMethod}`}>
                    {isPending && (
                        <p className=" mt-4">
                            <b>{t("pages.oauthCallback.redirecting")}</b>
                        </p>
                    )}
                </FormCardHeader>
            </Card>
        </FormLayout>
    );
};
