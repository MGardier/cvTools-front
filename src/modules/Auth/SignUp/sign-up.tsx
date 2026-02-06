import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/app/constants/routes";
import type { IApiErrors } from "@/shared/types/api";
import { createSignUpSchema } from "../schema/auth-schema";
import type { ISignUpResponse } from "../types";
import { authService } from "@/lib/service/Auth/auth.service";
import { SignUpUi } from "./sign-up.ui";

export const SignUp = () => {
    const { t } = useTranslation('auth');
    const navigate = useNavigate();

    const schema = createSignUpSchema(t);
    const defaultValues = {
        email: "",
        password: "",
        confirmPassword: "",
    };

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues,
    });

    const mutation = useMutation<ISignUpResponse, IApiErrors, z.infer<typeof schema>>({
        mutationFn: authService.signUp,
        onSuccess: (response) => {
            toast.success(t("messages.success.signUp.short"))
            navigate(`/${ROUTES.auth.confirmAccount}?email=${response.data.email}`)
        },
        onError: (error) => {
            toast.error(t(`messages.errors.api.${error.message}.short`, t('messages.errors.fallback')))
        }
    });

    const onSubmit = (values: z.infer<typeof schema>) => {
        mutation.mutate(values);
    };

    return (
        <SignUpUi
            form={form}
            onSubmit={onSubmit}
            isError={mutation.isError}
            isPending={mutation.isPending}
            error={mutation.error}
            t={t}
        />
    );
};
