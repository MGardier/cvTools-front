import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ROUTES } from "@/app/constants/routes";
import type { IConfirmAccountResponse } from "../types";
import type { IApiErrors } from "@/shared/types/api";
import type { IConfirmAccountData } from "./types";
import { authService } from "@/lib/service/Auth/auth.service";
import { ConfirmAccountUi } from "./confirm-account.ui";
import { ResendConfirmAccount } from "../ResendConfirmAccount/resend-confirm-account";

export const ConfirmAccount = () => {
    const { t } = useTranslation("auth");
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    const mutation = useMutation<IConfirmAccountResponse, IApiErrors, IConfirmAccountData>({
        mutationFn: authService.confirmAccount,
        onSuccess: () => {
            toast.success(t("api.success.confirmAccount.short"));
            navigate(`/${ROUTES.auth.signIn}`);
        },
        onError: () => toast.error(t(`messages.errors.confirmAccount`)),
    });

    useEffect(() => {
        if (token) {
            mutation.mutate({ token });
        }
    }, []);

    if (!token) {
        return <ResendConfirmAccount defaultEmail={email} />;
    }

    return (
        <ConfirmAccountUi
            isSuccess={mutation.isSuccess}
            isPending={mutation.isPending}
            isError={mutation.isError}
            t={t}
        />
    );
};
