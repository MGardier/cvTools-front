import { Card } from "@/common/components/ui/card";
import { AuthCardHeader } from "../components/auth-card-header";
import { AuthCardContent } from "../components/auth-card-content";
import { AuthField } from "../components/auth-field";
import { AuthLayout } from "../components/auth-layout";
import type { SubmitHandler, UseFormReturn } from "react-hook-form";
import type { TFunction } from "i18next";
import type { ISendForgotPasswordData } from "./types";

interface ISendForgotPasswordUiProps {
  onSubmit: SubmitHandler<ISendForgotPasswordData>;
  form: UseFormReturn<ISendForgotPasswordData>;
  isPending: boolean;
  isError: boolean;
  defaultEmail: string | null;
  t: TFunction<'auth', undefined>;
}

export const SendForgotPasswordUi = ({
    form, onSubmit, isError, isPending, defaultEmail, t
}: ISendForgotPasswordUiProps) => {
    return (
        <AuthLayout>
            <Card className="border-0 shadow-none w-full max-w-sm md:max-w-md lg:max-w-lg">
                <AuthCardHeader title={t("pages.sendForgotPassword.title")}>
                    {isError && (
                        <div className="text-red-700 mt-4 flex items-center justify-center gap-2">
                            <p>
                                <b>{t("pages.sendForgotPassword.errors.sendingEmailFailed")}</b>.
                            </p>
                        </div>
                    )}
                    {Boolean(defaultEmail) && (
                        <div className="text-green-700 mt-4 flex items-center justify-center gap-2">
                            <p>
                                {t("pages.sendForgotPassword.success.emailSendAt")} <b>{defaultEmail}</b>.
                            </p>
                        </div>
                    )}
                </AuthCardHeader>
                <AuthCardContent
                    {...{ onSubmit, form, labelButton: t("pages.sendForgotPassword.form.button"), isLoading: isPending }}
                >
                    <div className="grid gap-6">
                        <AuthField
                            label={t("pages.sendForgotPassword.form.email")}
                            name="email"
                            type="email"
                            placeholder="john.doe@example.com"
                            required
                            {...{ form }}
                        />
                    </div>
                </AuthCardContent>
            </Card>
        </AuthLayout>
    );
};
