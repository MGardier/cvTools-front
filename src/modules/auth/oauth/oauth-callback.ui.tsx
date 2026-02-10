import { Card } from "@/shared/components/ui/card";
import { AuthCardHeader } from "../components/auth-card-header";
import { AuthLayout } from "../components/auth-layout";
import type { TFunction } from "i18next";

interface IOauthCallbackUiProps {
  isPending: boolean;
  loginMethod: string;
  t: TFunction<'auth', undefined>;
}

export const OauthCallbackUi = ({ isPending, loginMethod, t }: IOauthCallbackUiProps) => {
    return (
        <AuthLayout>
            <Card className="border-0 shadow-none w-full max-w-sm md:max-w-md lg:max-w-lg">
                <AuthCardHeader title={`${t("pages.oauthCallback.title")} ${loginMethod}`}>
                    {isPending && (
                        <p className=" mt-4">
                            <b>{t("pages.oauthCallback.redirecting")}</b>
                        </p>
                    )}
                </AuthCardHeader>
            </Card>
        </AuthLayout>
    );
};
