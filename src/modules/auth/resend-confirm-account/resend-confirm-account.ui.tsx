import { Card } from "@/shared/components/ui/card";
import { FormCardHeader } from "@/shared/components/form/form-card-header";
import { FormCardContent } from "@/shared/components/form/form-card-content";
import { InputField } from "@/shared/components/form/input-field";
import { FormLayout } from "@/shared/components/form/form-layout";
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
        <FormLayout>
            <Card className="border-0 shadow-none w-full max-w-sm md:max-w-md lg:max-w-lg">
                <FormCardHeader title={t("pages.confirmAccount.title")}>
                    {defaultEmail || isSuccess && !isError && (
                        <div className="text-green-700 mt-4 flex items-center justify-center gap-2">
                            <p>
                                {`${t("pages.confirmAccount.success.emailSendAt")} `}<b>{email}</b>.
                            </p>
                        </div>
                    )}

                </FormCardHeader>
                <FormCardContent
                    {...{ onSubmit, form, labelButton: t("pages.confirmAccount.form.button"), isLoading: isPending }}
                >
                    <div className="grid gap-6">
                        <InputField
                            label={t("pages.confirmAccount.form.email")}
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
