import { Card } from "@/shared/components/ui/card";
import { FormCardHeader } from "@/shared/components/form/form-card-header";
import { FormCardContent } from "@/shared/components/form/form-card-content";
import { AuthSocialMedia } from "../components/auth-social-media";
import { InputField } from "@/shared/components/form/input-field";
import { FormLayout } from "@/shared/components/form/form-layout";
import { ROUTES } from "@/app/constants/routes";
import type { SubmitHandler, UseFormReturn } from "react-hook-form";
import type { TFunction } from "i18next";
import type { ISignInData } from "./types";
import type { IApiErrors } from "@/shared/types/api";

interface ISignInUiProps {
  onSubmit: SubmitHandler<ISignInData>;
  form: UseFormReturn<ISignInData>;
  isPending: boolean;
  error: IApiErrors | null;
  t: TFunction<'auth', undefined>;
}

export const SignInUi = ({ form, onSubmit, isPending, error, t }: ISignInUiProps) => {

    
    return (
        <FormLayout>
            <Card className="border-0 shadow-none w-full max-w-sm md:max-w-md lg:max-w-lg">
                <FormCardHeader title={t("pages.signIn.title")}>
                    {`${t("pages.signIn.hasAccount")} `}
                    <a className="font-semibold" href={ROUTES.auth.signUp}>
                        {t("pages.signIn.signInLink")}
                    </a>
                    {error?.message === 'ACCOUNT_PENDING' && (
                        <div className="text-red-600 mt-4 flex flex-col items-center justify-center gap-2">
                            <p><b>{t('messages.errors.api.ACCOUNT_PENDING.long')}</b></p>
                            <a className="underline text-red-500 hover:text-red-600" href={ROUTES.auth.confirmAccount}>
                                {t('messages.errors.api.ACCOUNT_PENDING.link')}
                            </a>
                        </div>
                    )}
                </FormCardHeader>

                <FormCardContent
                    {...{
                        onSubmit,
                        form,
                        labelButton: t("pages.signIn.form.button"),
                        isLoading: isPending,
                    }}
                >
                    <AuthSocialMedia />
                    <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                        <span className="bg-card text-muted-foreground relative z-10 px-2">
                            Ou
                        </span>
                    </div>
                    <div className="grid gap-6">
                        <InputField
                            label={t("pages.signIn.form.email")}
                            name="email"
                            type="email"
                            placeholder="john.doe@example.com"
                            required
                            {...{ form }}
                        />
                        <InputField
                            label={t("pages.signIn.form.password")}
                            labelRight={
                                <a
                                    className="font-semibold text-sm font-sans text-muted-foreground"
                                    href={`${ROUTES.auth.resetPassword}${form.watch("email") ? `?email=${encodeURIComponent(form.watch("email"))}` : ""}`}
                                >
                                    {t("pages.signIn.form.forgotPassword")}
                                </a>
                            }
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
