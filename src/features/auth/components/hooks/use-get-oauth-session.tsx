import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { authService } from "../../auth.service";
import type { ApiErrors, SignInResponse } from "../../types/api";
import { ROUTES } from "@/data/routes";
import type { UseCompleteOauthReturn,  } from "../../types/hook";
import { useAuthStore } from "../../auth.store";
import { useEffect } from "react";
import { useCookieStore } from "@/store/cookie.store";

export const useGetOauthSession = (sessionId : string , loginMethod: string): UseCompleteOauthReturn => {
  const { t } = useTranslation("auth");
  const navigate = useNavigate();
  const authStore = useAuthStore();
  const cookieStore = useCookieStore();


  const mutation = useMutation<
    SignInResponse,
    ApiErrors,
    string
  >({
    mutationFn:  authService.getOauthSession,
    onSuccess: (response) => {
      authStore.setAuth({accessToken :response.data.tokens.accessToken, user: response.data.user });
      cookieStore.setRefreshToken(response.data.tokens.refreshToken);
      toast.success(t("messages.success.signIn.short"));
      navigate(`${ROUTES.home}`);
    },
    onError: () => {
      toast.error(t(`messages.errors.api.${loginMethod}_COMPLETED_OAUTH_FAILED.short`))
      navigate(`${ROUTES.auth.signIn}?errorCode=${loginMethod}_COMPLETED_OAUTH_FAILED`);
    }
    
  });

  useEffect(()=> {
       mutation.mutate(sessionId);
  },[])

 


  return {
    t,
    isPending: mutation.isPending,
  };
};
