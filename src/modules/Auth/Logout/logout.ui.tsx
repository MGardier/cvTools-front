import { Card, CardContent } from "@/common/components/ui/card";
import { AuthCardHeader } from "../components/auth-card-header";
import { AuthLayout } from "../components/auth-layout";
import type { ILogoutUiProps } from "./types";

export const LogoutUi = ({ isPending, isError, t }: ILogoutUiProps) => {
    return (
        <AuthLayout>
            <Card className="border-0 shadow-none w-full max-w-sm md:max-w-md lg:max-w-lg">
                <AuthCardHeader title={t("pages.logout.title")}>
                    {isError && (
                        <p className="text-red-700 mt-4">
                            <b>
                                {t("pages.logout.title")}
                            </b>
                        </p>
                    )}
                    {isPending && (
                        <p className=" mt-4">
                            <b>
                                {t("pages.logout.pending.waitingLogout")}
                            </b>
                        </p>
                    )}
                </AuthCardHeader>
                <CardContent></CardContent>
            </Card>
        </AuthLayout>
    );
};
