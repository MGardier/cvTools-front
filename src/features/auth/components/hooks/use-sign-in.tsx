import { useTranslation } from "react-i18next";

import { useForm } from "react-hook-form";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { toast } from "react-toastify";


import { useNavigate } from "react-router-dom";

import { ROUTES } from "@/common/data/routes";
import { useCookieStore } from "@/common/store/cookie.store";
import type { UseSignInReturn } from "../../types/hook";
import { useAuthStore } from "../../auth.store";
import { createSignInSchema } from "../../schema/auth-schema";
import type { SignInResponse } from "../../types/api";
import type { IApiErrors } from "@/common/types/api";
import { authService } from "@/lib/api/auth/auth.service";

export const useSignIn = (): UseSignInReturn => {
  const { t } = useTranslation("auth");
  const navigate = useNavigate();
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

  const mutation = useMutation<
    SignInResponse,
    IApiErrors,
    z.infer<typeof schema>
  >({
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
    onError: () => toast.error(t("messages.errors.fallback")),
  });

  const onSubmit = (values: z.infer<typeof schema>) => {
    mutation.mutate(values);
  };

  return {
    t,
    form,
    onSubmit,
    isError: mutation.isError,
    isPending: mutation.isPending,
  };
};
