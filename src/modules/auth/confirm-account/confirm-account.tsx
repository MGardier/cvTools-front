import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ROUTES } from "@/app/constants/routes";
import type { IConfirmAccountResponse } from "../types";
import type { IApiErrors } from "@/shared/types/api";
import type { IConfirmAccountData } from "./types";
import { authService } from "@/lib/service/auth/auth.service";
import { ConfirmAccountUi } from "./confirm-account.ui";
import { ResendConfirmAccount } from "../resend-confirm-account/resend-confirm-account";

export const ConfirmAccount = () => {
    const { t } = useTranslation("auth");
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    const mutation = useMutation<IConfirmAccountResponse, IApiErrors, IConfirmAccountData>({
        mutationFn: authService.confirmAccount,
        onSuccess: () => {
            toast.success(t("api.success.confirmAccount"));
            navigate(`/${ROUTES.auth.signIn}`);
        },
        onError: (error) => toast.error(t(`messages.errors.api.${error.message}`, t('messages.errors.fallback'))),
    });

    useEffect(() => {
        if (token) {
            mutation.mutate({ token });
        }
    }, []);

    if (!token) {
        return <ResendConfirmAccount defaultEmail={email} />;
    }

    const onRetry = () => {
        if (token) mutation.mutate({ token });
    };

    return (
        <ConfirmAccountUi
            isPending={mutation.isPending}
            isError={mutation.isError}
            onRetry={onRetry}
            t={t}
        />
    );
};
