import { Card } from "@/shared/components/ui/card";
import { AuthCardHeader } from "../components/auth-card-header";
import { AuthCardContent } from "../components/auth-card-content";
import { AuthField } from "../components/auth-field";
import { AuthLayout } from "../components/auth-layout";
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
        <AuthLayout>
            <Card className="border-0 shadow-none w-full max-w-sm md:max-w-md lg:max-w-lg">
                <AuthCardHeader title={t("pages.resetPassword.title")} />
                <AuthCardContent
                    {...{ onSubmit, form, labelButton: t("pages.resetPassword.form.button"), isLoading: isPending }}
                >
                    <div className="grid gap-6">
                        <AuthField
                            label={t("pages.resetPassword.form.password")}
                            name="password"
                            type="password"
                            placeholder="••••••••••••"
                            required
                            {...{ form }}
                        />
                    </div>
                </AuthCardContent>
            </Card>
        </AuthLayout>
    );
};
