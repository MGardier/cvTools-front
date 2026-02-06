import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useCookieStore } from "@/app/store/cookie.store";
import { useAuthStore } from "../store/auth.store";
import type { ISignInResponse } from "../types";
import type { IApiErrors } from "@/shared/types/api";
import { authService } from "@/lib/service/auth/auth.service";
import { ROUTES } from "@/app/constants/routes";
import { GetOauthSessionUi } from "./get-oauth-session.ui";

export const GetOauthSession = () => {
    const { t } = useTranslation("auth");
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("sessionId");
    const loginMethod = searchParams.get("loginMethod");
    const authStore = useAuthStore();
    const cookieStore = useCookieStore();

    const mutation = useMutation<ISignInResponse, IApiErrors, string>({
        mutationFn: authService.getOauthSession,
        onSuccess: (response) => {
            authStore.setAuth({ accessToken: response.data.tokens.accessToken, user: response.data.user });
            cookieStore.setRefreshToken(response.data.tokens.refreshToken);
            toast.success(t("messages.success.signIn.short"));
            navigate(`${ROUTES.home}`);
        },
        onError: () => {
            toast.error(t(`messages.errors.api.${loginMethod}_COMPLETED_OAUTH_FAILED.short`));
            navigate(`${ROUTES.auth.signIn}?errorCode=${loginMethod}_COMPLETED_OAUTH_FAILED`);
        }
    });

    useEffect(() => {
        if (!sessionId || !loginMethod) {
            navigate(`${ROUTES.auth.signIn}?errorCode=${loginMethod}_COMPLETED_OAUTH_FAILED`);
            return;
        }
        mutation.mutate(sessionId);
    }, []);

    return (
        <GetOauthSessionUi
            isPending={mutation.isPending}
            loginMethod={loginMethod || ""}
            t={t}
        />
    );
};
