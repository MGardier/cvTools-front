import { Card, CardContent } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { AuthCardHeader } from "../components/auth-card-header";
import { AuthLayout } from "../components/auth-layout";
import { Loader2 } from "lucide-react";
import type { TFunction } from "i18next";

interface ILogoutUiProps {
  isPending: boolean;
  t: TFunction<'auth', undefined>;
}

export const LogoutUi = ({ isPending, t }: ILogoutUiProps) => {
    return (
        <AuthLayout>
            <Card className="border-0 shadow-none w-full max-w-sm md:max-w-md lg:max-w-lg">
                <AuthCardHeader title={t("pages.logout.title")} />
                {isPending && (
                    <CardContent>
                        <Button
                            className="w-full flex gap-2 text-white"
                            size="form"
                            variant="blue"
                            disabled
                        >
                            <Loader2 size="16" className="animate-spin" />
                            {t("pages.logout.pending.waitingLogout")}
                        </Button>
                    </CardContent>
                )}
            </Card>
        </AuthLayout>
    );
};
