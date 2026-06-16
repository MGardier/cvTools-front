import { Card, CardContent } from "@/shared/components/ui/card";
import { FormCardHeader } from "@/shared/components/form/form-card-header";
import { FormCardContent } from "@/shared/components/form/form-card-content";
import { FormLayout } from "@/shared/components/form/form-layout";
import { InputField } from "@/shared/components/form/input-field";
import { Loader2 } from "lucide-react";
import { AdminAuthSocialMedia } from "../components/admin-auth-social-media";
import type { SubmitHandler, UseFormReturn } from "react-hook-form";
import type { TFunction } from "i18next";
import type { IAdminRegisterData } from "./types";

interface IAdminRegisterUiProps {
  form: UseFormReturn<IAdminRegisterData>;
  onSubmit: SubmitHandler<IAdminRegisterData>;
  isPending: boolean;
  isValidating: boolean;
  isInvalidInvitation: boolean;
  email: string;
  token: string;
  t: TFunction<'auth', undefined>;
}

export const AdminRegisterUi = ({
  form,
  onSubmit,
  isPending,
  isValidating,
  isInvalidInvitation,
  email,
  token,
  t,
}: IAdminRegisterUiProps) => {
  return (
    <FormLayout>
      <Card className="border-0 shadow-none w-full max-w-sm md:max-w-md lg:max-w-lg">
        <FormCardHeader title={t("pages.adminRegister.title")}>
          {!isValidating && !isInvalidInvitation && email
            ? `${t("pages.adminRegister.invitedAs")} ${email}`
            : null}
        </FormCardHeader>

        {isValidating && (
          <CardContent className="flex justify-center">
            <Loader2 size="20" className="animate-spin" />
          </CardContent>
        )}

        {!isValidating && isInvalidInvitation && (
          <CardContent className="text-center text-sm text-muted-foreground">
            {t("pages.adminRegister.invalidInvitation")}
          </CardContent>
        )}

        {!isValidating && !isInvalidInvitation && (
          <FormCardContent
            {...{
              onSubmit,
              form,
              labelButton: t("pages.adminRegister.form.submit"),
              isLoading: isPending,
            }}
          >
            <AdminAuthSocialMedia token={token} />
            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
              <span className="bg-card text-muted-foreground relative z-10 px-2">
                {t("pages.adminRegister.socialDivider")}
              </span>
            </div>
            <div className="grid gap-6">
              <InputField
                label={t("pages.adminRegister.form.password")}
                name="password"
                type="password"
                placeholder="••••••••••••"
                required
                {...{ form }}
              />
              <InputField
                label={t("pages.adminRegister.form.confirmPassword")}
                name="confirmPassword"
                type="password"
                placeholder="••••••••••••"
                required
                {...{ form }}
              />
            </div>
          </FormCardContent>
        )}
      </Card>
    </FormLayout>
  );
};
