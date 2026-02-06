import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type z from "zod";
import { ROUTES } from "@/app/constants/routes";
import { createResetPasswordSchema } from "../schema/auth-schema";
import type { IResetPasswordResponse } from "../types";
import type { IApiErrors } from "@/shared/types/api";
import { authService } from "@/lib/service/auth/auth.service";
import { ResetPasswordUi } from "./reset-password.ui";
import { SendForgotPassword } from "../send-forgot-password/send-forgot-password";

export const ResetPassword = () => {
    const { t } = useTranslation("auth");
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    const schema = createResetPasswordSchema(t);
    const defaultValues = {
        password: "",
    };
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues,
    });
    

    const mutation = useMutation<IResetPasswordResponse, IApiErrors, z.infer<typeof schema>>({
        mutationFn: (formData: z.infer<typeof schema>) =>
            authService.resetPassword({ ...formData, token: token! }),
        onSuccess: () => {
            toast.success(t("messages.success.resetPassword.short"));
            navigate(`/${ROUTES.auth.signIn}`);
        },
        onError: () =>
            toast.error(t("messages.errors.resetPassword"))
    });

    const onSubmit = (values: z.infer<typeof schema>) => {
        mutation.mutate(values);
    };

    if (!token) {
        return <SendForgotPassword defaultEmail={email} />;
    }

    return (
        <ResetPasswordUi
            form={form}
            onSubmit={onSubmit}
            isError={mutation.isError}
            isPending={mutation.isPending}
            t={t}
        />
    );
};
