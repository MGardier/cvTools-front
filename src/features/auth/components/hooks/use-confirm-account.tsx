import { useTranslation } from "react-i18next";

import { useMutation } from "@tanstack/react-query";


import { toast } from "react-toastify";


import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/data/routes";
import type { UseConfirmReturn } from "../../types/hook";
import type { ConfirmAccountResponse } from "../../types/api";
import type { IApiErrors } from "@/types/api";
import type { ConfirmAccountData } from "../../types/form";
import { authService } from "../../auth.service";

export const useConfirmAccount = (token: string): UseConfirmReturn => {
  const { t } = useTranslation("auth");
  const navigate = useNavigate();

  const mutation = useMutation<
    ConfirmAccountResponse,
    IApiErrors,
    ConfirmAccountData
  >({
    mutationFn: authService.confirmAccount,
    onSuccess: () => {
      toast.success(t("api.success.confirmAccount.short"));
      navigate(`/${ROUTES.auth.signIn}`);
    },
    onError: () => toast.error(t(`messages.errors.confirmAccount`)),
  });

  useEffect(() => {
    mutation.mutate({ token });
  }, []);

  return {
    t,
    isSuccess: mutation.isSuccess,
    isPending: mutation.isPending,
    isError: mutation.isError,
  };
};
