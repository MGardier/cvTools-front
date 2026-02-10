import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/app/constants/routes";
import { ME_QUERY_KEY } from "@/shared/hooks/useMe";
import type { ILogoutResponse } from "../types";
import type { IApiErrors } from "@/shared/types/api";
import { authService } from "@/lib/service/auth/auth.service";
import { LogoutUi } from "./logout.ui";

export const Logout = () => {
    const { t } = useTranslation("auth");
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const mutation = useMutation<ILogoutResponse, IApiErrors>({
        mutationFn: authService.logout,
        onSuccess: () => {
            queryClient.setQueryData(ME_QUERY_KEY, null);
            toast.success(t("messages.success.logout.short"));
            navigate(`${ROUTES.auth.signIn}`);
        },
        onError: () => {
            queryClient.setQueryData(ME_QUERY_KEY, null);
            toast.success(t("messages.success.logout.short"));
            navigate(`${ROUTES.auth.signIn}`);
        },
    });

    useEffect(() => {
        mutation.mutate();
    }, []);

    return (
        <LogoutUi
            isPending={mutation.isPending}
            t={t}
        />
    );
};
