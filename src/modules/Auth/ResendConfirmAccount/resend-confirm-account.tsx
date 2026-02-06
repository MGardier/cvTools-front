import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useState } from "react";
import { createSendConfirmAccountSchema } from "../schema/auth-schema";
import type { ISendConfirmAccountResponse } from "../types";
import type { IApiErrors } from "@/common/types/api";
import { authService } from "@/lib/service/Auth/auth.service";
import { ResendConfirmAccountUi } from "./resend-confirm-account.ui";
import type { IResendConfirmAccountProps } from "./types";

export const ResendConfirmAccount = ({ defaultEmail }: IResendConfirmAccountProps) => {
    const [email, setEmail] = useState(defaultEmail);
    const { t } = useTranslation('auth');

    const schema = createSendConfirmAccountSchema(t);
    const defaultValues = {
        email: defaultEmail || "",
    };
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues,
    });

    const mutation = useMutation<ISendConfirmAccountResponse, IApiErrors, z.infer<typeof schema>>({
        mutationFn: authService.sendConfirmAccount,
        onSuccess: (response) => {
            toast.success(t("messages.success.sendConfirmAccount.short"))
            setEmail(response.data.email)
        },
        onError: () => {
            toast.error(t(`messages.errors.fallback`))
            setEmail(null)
        }
    });

    const onSubmit = (values: z.infer<typeof schema>) => {
        mutation.mutate(values);
    };

    return (
        <ResendConfirmAccountUi
            form={form}
            onSubmit={onSubmit}
            isSuccess={mutation.isSuccess}
            isPending={mutation.isPending}
            isError={mutation.isError}
            email={email}
            defaultEmail={defaultEmail}
            t={t}
        />
    );
};
