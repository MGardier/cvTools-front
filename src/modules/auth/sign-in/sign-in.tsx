import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ROUTES } from "@/app/constants/routes";
import { ME_QUERY_KEY } from "@/shared/hooks/useMe";
import { createSignInSchema } from "../schema/auth-schema";
import type { ISignInResponse } from "../types";
import type { IApiErrors } from "@/shared/types/api";
import { authService } from "@/lib/api/auth/auth.service";
import { SignInUi } from "./sign-in.ui";
import { oauthErrorQuerySchema } from "@cvtools/contracts";

export const SignIn = () => {
    const { t } = useTranslation("auth");
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    // OAuth error return URL (?errorCode=...), defined by @cvtools/contracts.
    const hasOauthError = Boolean(searchParams.get('errorCode'));
    const oauthError = oauthErrorQuerySchema.safeParse({ errorCode: searchParams.get('errorCode') });
    const queryClient = useQueryClient();

    useEffect(() => {
        if (hasOauthError) {
            toast.error(oauthError.success
                ? t(`messages.errors.api.${oauthError.data.errorCode}.short`, t(`messages.errors.api.${oauthError.data.errorCode}`, t('messages.errors.fallback')))
                : t('messages.errors.fallback'));
        }
    }, []);

    const schema = createSignInSchema(t);
    const defaultValues = {
        email: "",
        password: "",
    };

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues,
    });

    const mutation = useMutation<ISignInResponse, IApiErrors, z.infer<typeof schema>>({
        mutationFn: authService.signIn,
        onSuccess: (response) => {
            toast.success(t("messages.success.signIn"));
            // signIn returns the user in `data`, same shape as /auth/me.
            queryClient.setQueryData(ME_QUERY_KEY, response);
            navigate(`${ROUTES.home}`);
        },
        onError: (error) => {
            toast.error(t(`messages.errors.api.${error.message}.short`, t(`messages.errors.api.${error.message}`, t('messages.errors.fallback'))))
        },
    });

    const onSubmit = (values: z.infer<typeof schema>) => {
        mutation.mutate(values);
    };

    return (
        <SignInUi
            form={form}
            onSubmit={onSubmit}
            isPending={mutation.isPending}
            error={mutation.error}
            t={t}
        />
    );
};
