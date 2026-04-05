import { Card } from "@/shared/components/ui/card";
import { FormCardHeader } from "@/shared/components/form/form-card-header";
import { FormCardContent } from "@/shared/components/form/form-card-content";
import { InputField } from "@/shared/components/form/input-field";
import { FormLayout } from "@/shared/components/form/form-layout";
import type { SubmitHandler, UseFormReturn } from "react-hook-form";
import type { TFunction } from "i18next";
import type { IResetPasswordData } from "./types";

interface IResetPasswordUiProps {
  onSubmit: SubmitHandler<IResetPasswordData>;
  form: UseFormReturn<IResetPasswordData>;
  isPending: boolean;
  t: TFunction<'auth', undefined>;
}

export const ResetPasswordUi = ({ form, onSubmit, isPending, t }: IResetPasswordUiProps) => {
    return (
        <FormLayout>
            <Card className="border-0 shadow-none w-full max-w-sm md:max-w-md lg:max-w-lg">
                <FormCardHeader title={t("pages.resetPassword.title")} />
                <FormCardContent
                    {...{ onSubmit, form, labelButton: t("pages.resetPassword.form.button"), isLoading: isPending }}
                >
                    <div className="grid gap-6">
                        <InputField
                            label={t("pages.resetPassword.form.password")}
                            name="password"
                            type="password"
                            placeholder="••••••••••••"
                            required
                            {...{ form }}
                        />
                    </div>
                </FormCardContent>
            </Card>
        </FormLayout>
    );
};
