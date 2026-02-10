import { Card } from "@/shared/components/ui/card";
import { AuthCardHeader } from "../components/auth-card-header";
import { AuthCardContent } from "../components/auth-card-content";
import { AuthField } from "../components/auth-field";
import { AuthLayout } from "../components/auth-layout";
import type { SubmitHandler, UseFormReturn } from "react-hook-form";
import type { TFunction } from "i18next";
import type { ISendConfirmAccountData } from "./types";

interface IResendConfirmAccountUiProps {
  onSubmit: SubmitHandler<ISendConfirmAccountData>;
  form: UseFormReturn<ISendConfirmAccountData>;
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  email: string | null;
  defaultEmail: string | null;
  t: TFunction<'auth', undefined>;
}

export const ResendConfirmAccountUi = ({
    form, onSubmit, isSuccess, isPending, isError, email, defaultEmail, t
}: IResendConfirmAccountUiProps) => {
    return (
        <AuthLayout>
            <Card className="border-0 shadow-none w-full max-w-sm md:max-w-md lg:max-w-lg">
                <AuthCardHeader title={t("pages.confirmAccount.title")}>
                    {defaultEmail || isSuccess && !isError && (
                        <div className="text-green-700 mt-4 flex items-center justify-center gap-2">
                            <p>
                                {`${t("pages.confirmAccount.success.emailSendAt")} `}<b>{email}</b>.
                            </p>
                        </div>
                    )}

                </AuthCardHeader>
                <AuthCardContent
                    {...{ onSubmit, form, labelButton: t("pages.confirmAccount.form.button"), isLoading: isPending }}
                >
                    <div className="grid gap-6">
                        <AuthField
                            label={t("pages.confirmAccount.form.email")}
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
