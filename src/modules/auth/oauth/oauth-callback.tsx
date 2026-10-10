import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { ROUTES } from "@/app/constants/routes";
import { useMe } from "@/shared/hooks/useMe";
import { OauthCallbackUi } from "./oauth-callback.ui";
import { oauthErrorQuerySchema, oauthSuccessQuerySchema } from "@cvtools/contracts";

export const OauthCallback = () => {
    const { t } = useTranslation("auth");
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    // Return URL query string defined by @cvtools/contracts.
    const hasError = Boolean(searchParams.get("errorCode"));
    const errorQuery = oauthErrorQuerySchema.safeParse({ errorCode: searchParams.get("errorCode") });
    const successQuery = oauthSuccessQuerySchema.safeParse({ loginMethod: searchParams.get("loginMethod") });
    const loginMethod = successQuery.success ? successQuery.data.loginMethod : null;
    const { user, isError, isPending } = useMe();

    useEffect(() => {
        // Admin OAuth failure: the backend redirects here with an errorCode.
        if (hasError) {
            toast.error(errorQuery.success
                ? t(`messages.errors.api.${errorQuery.data.errorCode}.short`, t(`messages.errors.api.${errorQuery.data.errorCode}`, t('messages.errors.fallback')))
                : t('messages.errors.fallback'));
            navigate(`${ROUTES.auth.signIn}`);
            return;
        }
        if (!loginMethod) {
            toast.error(t('messages.errors.fallback'));
            navigate(`${ROUTES.auth.signIn}`);
        }
    }, []);

    useEffect(() => {
        if (user) {
            toast.success(t("messages.success.signIn.short"));
            navigate(`${ROUTES.home}`);
        }
    }, [user]);

    useEffect(() => {
        if (isError) {
            toast.error(t('messages.errors.fallback'));
            navigate(`${ROUTES.auth.signIn}`);
        }
    }, [isError]);

    return (
        <OauthCallbackUi
            isPending={isPending}
            loginMethod={loginMethod || ""}
            t={t}
        />
    );
};
