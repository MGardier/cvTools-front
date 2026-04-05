import { Card } from "@/shared/components/ui/card";
import { FormCardHeader } from "@/shared/components/form/form-card-header";
import { FormCardContent } from "@/shared/components/form/form-card-content";
import { AuthSocialMedia } from "../components/auth-social-media";
import { InputField } from "@/shared/components/form/input-field";
import { FormLayout } from "@/shared/components/form/form-layout";
import { ROUTES } from "@/app/constants/routes";
import type { SubmitHandler, UseFormReturn } from "react-hook-form";
import type { TFunction } from "i18next";
import type { ISignUpData } from "./types";
interface ISignUpUiProps {
  onSubmit: SubmitHandler<ISignUpData>;
  form: UseFormReturn<ISignUpData>;
  isPending: boolean;
  t: TFunction<'auth', undefined>;
}

export const SignUpUi = ({ form, onSubmit, isPending, t }: ISignUpUiProps) => {
    return (
        <FormLayout>
            <Card className="border-0 shadow-none w-full max-w-sm md:max-w-md lg:max-w-lg">
                <FormCardHeader title={t("pages.signUp.title")}>
                    {`${t("pages.signUp.hasAccount")} `}
                    <a className="font-semibold" href={ROUTES.auth.signIn}>
                        {t("pages.signUp.signInLink")}
                    </a>
                </FormCardHeader>

                <FormCardContent
                    {...{
                        onSubmit,
                        form,
                        labelButton: t("pages.signUp.form.submit"),
                        isLoading: isPending,
                    }}
                >
                    <AuthSocialMedia />
                    <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                        <span className="bg-card text-muted-foreground relative z-10 px-2">
                            {t("pages.signUp.socialDivider")}
                        </span>
                    </div>
                    <div className="grid gap-6">
                        <InputField
                            label={t("pages.signUp.form.email")}
                            name="email"
                            type="email"
                            placeholder="john.doe@example.com"
                            required
                            {...{ form }}
                        />
                        <InputField
                            label={t("pages.signUp.form.password")}
                            name="password"
                            type="password"
                            placeholder="••••••••••••"
                            required
                            {...{ form }}
                        />
                        <InputField
                            label={t("pages.signUp.form.confirmPassword")}
                            name="confirmPassword"
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
