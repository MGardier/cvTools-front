import { Card } from "@/shared/components/ui/card";
import { FormCardHeader } from "@/shared/components/form/form-card-header";
import { FormCardContent } from "@/shared/components/form/form-card-content";
import { InputField } from "@/shared/components/form/input-field";
import { FormLayout } from "@/shared/components/form/form-layout";
import type { SubmitHandler, UseFormReturn } from "react-hook-form";
import type { TFunction } from "i18next";
import type { ISendForgotPasswordData } from "./types";

interface ISendForgotPasswordUiProps {
  onSubmit: SubmitHandler<ISendForgotPasswordData>;
  form: UseFormReturn<ISendForgotPasswordData>;
  isPending: boolean;
  defaultEmail: string | null;
  t: TFunction<'auth', undefined>;
}

export const SendForgotPasswordUi = ({
    form, onSubmit, isPending, defaultEmail, t
}: ISendForgotPasswordUiProps) => {
    return (
        <FormLayout>
            <Card className="border-0 shadow-none w-full max-w-sm md:max-w-md lg:max-w-lg">
                <FormCardHeader title={t("pages.sendForgotPassword.title")}>
                    {Boolean(defaultEmail) && (
                        <div className="text-green-700 mt-4 flex items-center justify-center gap-2">
                            <p>
                                {t("pages.sendForgotPassword.success.emailSendAt")} <b>{defaultEmail}</b>.
                            </p>
                        </div>
                    )}
                </FormCardHeader>
                <FormCardContent
                    {...{ onSubmit, form, labelButton: t("pages.sendForgotPassword.form.button"), isLoading: isPending }}
                >
                    <div className="grid gap-6">
                        <InputField
                            label={t("pages.sendForgotPassword.form.email")}
                            name="email"
                            type="email"
                            placeholder="john.doe@example.com"
                            required
                            {...{ form }}
                        />
                    </div>
                </FormCardContent>
            </Card>
        </FormLayout>
    );
};
