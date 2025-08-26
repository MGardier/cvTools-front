import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { authService } from "../../auth.service";
import type { ApiErrors, CompleteOauthParams, SignInResponse } from "../../types/api";
import { ROUTES } from "@/data/routes";
import type { UseCompleteOauthReturn,  } from "../../types/hook";
import { useAuthStore } from "../../auth.store";
import { useEffect } from "react";

export const useCompleteOauth = (oauthId : string , loginMethod: string): UseCompleteOauthReturn => {
  const { t } = useTranslation("auth");
  const navigate = useNavigate();
  const authStore = useAuthStore();


  const mutation = useMutation<
    SignInResponse,
    ApiErrors,
    CompleteOauthParams
  >({
    mutationFn:  authService.completeOauth,
    onSuccess: (response) => {
      authStore.setAuth({ ...response.data.tokens, user: response.data.user });
      toast.success(t("messages.success.signIn.short"));
      navigate(`${ROUTES.home}`);
    },
    onError: () => {
      toast.error(t(`messages.errors.api.${loginMethod}_COMPLETED_OAUTH_FAILED.short`))
      navigate(`${ROUTES.auth.signIn}?errorCode=${loginMethod}_COMPLETED_OAUTH_FAILED`);
    }
    
    
  });

  useEffect(()=> {
       mutation.mutate({oauthId,loginMethod});
  },[])

 


  return {
    t,
    isPending: mutation.isPending,
  };
};
