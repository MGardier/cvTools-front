import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ROUTES } from "@/app/constants/routes";
import { useCookieStore } from "@/app/store/cookie.store";
import { useAuthStore } from "../store/auth.store";
import { createSignInSchema } from "../schema/auth-schema";
import type { ISignInResponse } from "../types";
import type { IApiErrors } from "@/shared/types/api";
import { authService } from "@/lib/service/auth/auth.service";
import { SignInUi } from "./sign-in.ui";

export const SignIn = () => {
    const { t } = useTranslation("auth");
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const oauthErrorCode = searchParams.get('errorCode');
    const authStore = useAuthStore();
    const cookieStore = useCookieStore();

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
            authStore.setAuth({
                accessToken: response.data.tokens.accessToken,
                user: response.data.user,
            });
            cookieStore.setRefreshToken(response.data.tokens.refreshToken);
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
            isError={mutation.isError}
            isPending={mutation.isPending}
            oauthErrorCode={oauthErrorCode}
            error={mutation.error}
            t={t}
        />
    );
};
