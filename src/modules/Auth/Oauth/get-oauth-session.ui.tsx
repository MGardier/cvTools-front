import { Card } from "@/common/components/ui/card";
import { AuthCardHeader } from "../components/auth-card-header";
import { AuthLayout } from "../components/auth-layout";
import type { IGetOauthSessionUiProps } from "./types";

export const GetOauthSessionUi = ({ isPending, loginMethod, t }: IGetOauthSessionUiProps) => {
    return (
        <AuthLayout>
            <Card className="border-0 shadow-none w-full max-w-sm md:max-w-md lg:max-w-lg">
                <AuthCardHeader title={`${t("pages.getOauthSession.title")} ${loginMethod}`}>
                    {isPending && (
                        <p className=" mt-4">
                            <b>{t("pages.getOauthSession.pending.waiting")}</b>
                        </p>
                    )}
                </AuthCardHeader>
            </Card>
        </AuthLayout>
    );
};
