import { Card } from "@/common/components/ui/card";
import { AuthCardHeader } from "../components/auth-card-header";
import { AuthCardContent } from "../components/auth-card-content";
import { AuthSocialMedia } from "../components/auth-social-media";
import { AuthField } from "../components/auth-field";
import { AuthLayout } from "../components/auth-layout";
import { ROUTES } from "@/common/data/routes";
import type { ISignUpUiProps } from "./types";

export const SignUpUi = ({ form, onSubmit, isError, isPending, error, t }: ISignUpUiProps) => {
    return (
        <AuthLayout>
            <Card className="border-0 shadow-none w-full max-w-sm md:max-w-md lg:max-w-lg">
                <AuthCardHeader title={t("pages.signUp.title")}>
                    {`${t("pages.signUp.hasAccount")} `}
                    <a className="font-semibold" href={ROUTES.auth.signIn}>
                        {t("pages.signUp.signInLink")}
                    </a>
                    {isError && (
                        <div className="text-red-600 mt-4 flex items-center justify-center gap-2">
                            <p>
                                <b>
                                    {error?.message
                                        ? t(`messages.errors.api.${error.message}.short`)
                                        : t("messages.errors.fallback")}
                                </b>
                                .
                            </p>
                        </div>
                    )}
                </AuthCardHeader>

                <AuthCardContent
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
                        <AuthField
                            label={t("pages.signUp.form.email")}
                            name="email"
                            type="email"
                            placeholder="john.doe@example.com"
                            required
                            {...{ form }}
                        />
                        <AuthField
                            label={t("pages.signUp.form.password")}
                            name="password"
                            type="password"
                            placeholder="••••••••••••"
                            required
                            {...{ form }}
                        />
                        <AuthField
                            label={t("pages.signUp.form.confirmPassword")}
                            name="confirmPassword"
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
