import { useTranslation } from "react-i18next";

import { useMutation } from "@tanstack/react-query";

import { toast } from "react-toastify";



import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/data/routes";

import { useCookieStore } from "@/store/cookie.store";
import type { UseLogoutReturn } from "../types/hook";
import { useAuthStore } from "../auth.store";
import type { LogoutResponse } from "../types/api";
import type { IApiErrors } from "@/types/api";
import { authService } from "../auth.service";

export const useLogout = (): UseLogoutReturn => {
  const { t } = useTranslation("auth");
  const navigate = useNavigate();
  const authStore = useAuthStore();
  const cookieStore = useCookieStore();

  const mutation = useMutation<LogoutResponse, IApiErrors>({
    mutationFn: authService.logout,
    onSuccess: () => {
      authStore.resetAuth();
      cookieStore.removeRefreshToken();
      toast.success(t("api.success.logout.short"));
      navigate(`/${ROUTES.auth.signIn}`);
    },
    onError: () => {
      toast.error(t("messages.errors.fallback"));
    },
  });

  useEffect(() => {
    mutation.mutate();
  }, []);

  return { t, isPending: mutation.isPending, isError: mutation.isError };
};
