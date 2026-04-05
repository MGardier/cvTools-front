import { Card, CardContent } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { FormCardHeader } from "@/shared/components/form/form-card-header";
import { FormLayout } from "@/shared/components/form/form-layout";
import { Loader2 } from "lucide-react";
import type { TFunction } from "i18next";

interface IConfirmAccountUiProps {
  isPending: boolean;
  isError: boolean;
  onRetry: () => void;
  t: TFunction<'auth', undefined>;
}

export const ConfirmAccountUi = ({ isError, isPending, onRetry, t }: IConfirmAccountUiProps) => {
    return (
        <FormLayout>
            <Card className="border-0 shadow-none w-full max-w-sm md:max-w-md lg:max-w-lg">
                <FormCardHeader title={t("pages.confirmAccount.title")} />
                <CardContent>
                    <Button
                        className="w-full flex gap-2 text-white"
                        size="form"
                        variant="blue"
                        disabled={isPending}
                        onClick={isError ? onRetry : undefined}
                    >
                        {isPending && !isError && <Loader2 size="16" className="animate-spin" />}
                        {isPending
                            ? t("pages.confirmAccount.pending.sending")
                            : t("pages.confirmAccount.form.button")
                        }
                    </Button>
                </CardContent>
            </Card>
        </FormLayout>
    );
};
