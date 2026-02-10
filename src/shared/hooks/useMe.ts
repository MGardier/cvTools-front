import { useQuery } from "@tanstack/react-query";
import { authService } from "@/lib/service/auth/auth.service";
import type { IMeResponse } from "@/modules/auth/types";
import type { IApiErrors } from "@/shared/types/api";

export const ME_QUERY_KEY = ['me'] as const;

export const useMe = () => {
  const query = useQuery<IMeResponse, IApiErrors>({
    queryKey: ME_QUERY_KEY,
    queryFn: authService.me,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  return {
    ...query,
    user: query.data?.data ?? null,
  };
};
