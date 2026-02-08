import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
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

    const { data, error, isPending } = useQuery<ISignInResponse, IApiErrors>({
        queryKey: ['oauth-session', sessionId],
        queryFn: () => {
            if (!sessionId) {
                toast.error(t('messages.errors.fallback'));
                navigate(`${ROUTES.auth.signIn}`);
                return Promise.reject();
            }
            return authService.getOauthSession(sessionId);
        },
        enabled: Boolean(sessionId) && Boolean(loginMethod),
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        staleTime: Infinity,
    });

    useEffect(() => {
        if (!sessionId || !loginMethod) {
            toast.error(t('messages.errors.fallback'));
            navigate(`${ROUTES.auth.signIn}`);
        }
    }, []);

    useEffect(() => {
        if (data) {
            authStore.setAuth({ accessToken: data.data.tokens.accessToken, user: data.data.user });
            cookieStore.setRefreshToken(data.data.tokens.refreshToken);
            toast.success(t("messages.success.signIn.short"));
            navigate(`${ROUTES.home}`);
        }
    }, [data]);

    useEffect(() => {
        if (error) {
            toast.error(t(`messages.errors.api.${error.message}.short`, t(`messages.errors.api.${error.message}`, t('messages.errors.fallback'))));
            navigate(`${ROUTES.auth.signIn}`);
        }
    }, [error]);

    return (
        <GetOauthSessionUi
            isPending={isPending}
            loginMethod={loginMethod || ""}
            t={t}
        />
    );
};
