import { Card, CardContent } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { AuthCardHeader } from "../components/auth-card-header";
import { AuthLayout } from "../components/auth-layout";
import { ROUTES } from "@/app/constants/routes";
import type { TFunction } from "i18next";

interface IConfirmAccountUiProps {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  t: TFunction<'auth', undefined>;
}

export const ConfirmAccountUi = ({ isSuccess, isError, isPending, t }: IConfirmAccountUiProps) => {
    return (
        <AuthLayout>
            <Card className="border-0 shadow-none w-full max-w-sm md:max-w-md lg:max-w-lg">
                <AuthCardHeader title={t("pages.confirmAccount.title")}>
                    {isSuccess && (
                        <p className="text-green-600 mt-4">
                            <b>{t("pages.confirmAccount.success.confirmAccount")}</b>
                        </p>
                    )}
                    {isError && (
                        <p className="text-red-700 mt-4">
                            <b>{t("pages.confirmAccount.errors.tokenInvalid")}</b>
                        </p>
                    )}
                    {isPending && (
                        <p className=" mt-4">
                            <b>{t("pages.confirmAccount.pending.confirmAccount")}</b>
                        </p>
                    )}
                </AuthCardHeader>
                <CardContent>
                    {isError && (
                        <Button
                            className="w-full flex gap-2 text-white"
                            size="form"
                            variant="blue"
                        >
                            <a href={ROUTES.auth.confirmAccount}>{t("pages.confirmAccount.form.button")}</a>
                        </Button>
                    )}
                </CardContent>
            </Card>
        </AuthLayout>
    );
};
