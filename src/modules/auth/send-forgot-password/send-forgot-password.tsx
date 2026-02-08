import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type z from "zod";
import { ROUTES } from "@/app/constants/routes";
import { createSendForgotPasswordSchema } from "../schema/auth-schema";
import type { ISendForgotPasswordResponse } from "../types";
import type { IApiErrors } from "@/shared/types/api";
import { authService } from "@/lib/service/auth/auth.service";
import { SendForgotPasswordUi } from "./send-forgot-password.ui";
import type { ISendForgotPasswordProps } from "./types";

export const SendForgotPassword = ({ defaultEmail }: ISendForgotPasswordProps) => {
    const { t } = useTranslation('auth');
    const navigate = useNavigate();

    const schema = createSendForgotPasswordSchema(t);
    const defaultValues = {
        email: defaultEmail || "",
    };
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues,
    });

    const mutation = useMutation<ISendForgotPasswordResponse, IApiErrors, z.infer<typeof schema>>({
        mutationFn: authService.sendForgotPassword,
        onSuccess: (response) => {
            toast.success(t("messages.success.sendForgotPassword"));
            navigate(`/${ROUTES.auth.resetPassword}?email=${encodeURIComponent(response.data.email)}`)
        },
        onError: () =>
            toast.error(t("messages.errors.sendForgotPassword"))
    });

    const onSubmit = (values: z.infer<typeof schema>) => {
        mutation.mutate(values);
    };

    return (
        <SendForgotPasswordUi
            form={form}
            onSubmit={onSubmit}
            isPending={mutation.isPending}
            defaultEmail={defaultEmail}
            t={t}
        />
    );
};
