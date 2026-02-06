import { Card } from "@/shared/components/ui/card";
import { AuthCardHeader } from "../components/auth-card-header";
import { AuthCardContent } from "../components/auth-card-content";
import { AuthSocialMedia } from "../components/auth-social-media";
import { AuthField } from "../components/auth-field";
import { AuthLayout } from "../components/auth-layout";
import { ROUTES } from "@/app/constants/routes";
import type { SubmitHandler, UseFormReturn } from "react-hook-form";
import type { TFunction } from "i18next";
import type { ISignInData } from "./types";

interface ISignInUiProps {
  onSubmit: SubmitHandler<ISignInData>;
  form: UseFormReturn<ISignInData>;
  isPending: boolean;
  isError: boolean;
  oauthErrorCode: string | null;
  t: TFunction<'auth', undefined>;
}

export const SignInUi = ({ form, onSubmit, isError, isPending, oauthErrorCode, t }: ISignInUiProps) => {
    return (
        <AuthLayout>
            <Card className="border-0 shadow-none w-full max-w-sm md:max-w-md lg:max-w-lg">
                <AuthCardHeader title={t("pages.signIn.title")}>
                    {`${t("pages.signIn.hasAccount")} `}
                    <a className="font-semibold" href={ROUTES.auth.signUp}>
                        {t("pages.signIn.signInLink")}
                    </a>
                    {oauthErrorCode && !isPending && !isError && (
                        <div className="text-red-600 mt-4 flex items-center justify-center gap-2">
                            <p>
                                <b>{t(`messages.errors.api.${oauthErrorCode}.long`)}</b>
                            </p>
                        </div>
                    )}
                </AuthCardHeader>

                <AuthCardContent
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
                        <AuthField
                            label={t("pages.signIn.form.email")}
                            name="email"
                            type="email"
                            placeholder="john.doe@example.com"
                            required
                            {...{ form }}
                        />
                        <AuthField
                            label={t("pages.signIn.form.password")}
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
