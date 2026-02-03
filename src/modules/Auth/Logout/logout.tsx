import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/common/data/routes";
import { useCookieStore } from "@/common/store/cookie.store";
import { useAuthStore } from "../store/auth.store";
import type { ILogoutResponse } from "../types";
import type { IApiErrors } from "@/common/types/api";
import { authService } from "@/lib/api/Auth/auth.service";
import { LogoutUi } from "./logout.ui";

export const Logout = () => {
    const { t } = useTranslation("auth");
    const navigate = useNavigate();
    const authStore = useAuthStore();
    const cookieStore = useCookieStore();

    const mutation = useMutation<ILogoutResponse, IApiErrors>({
        mutationFn: authService.logout,
        onSuccess: () => {
            authStore.resetAuth();
            cookieStore.removeRefreshToken();
            toast.success(t("api.success.logout.short"));
            navigate(`/${ROUTES.auth.signIn}`);
        },
        onError: () => {
            toast.error(t("messages.errors.fallback"));
        },
    });

    useEffect(() => {
        mutation.mutate();
    }, []);

    return (
        <LogoutUi
            isPending={mutation.isPending}
            isError={mutation.isError}
            t={t}
        />
    );
};
