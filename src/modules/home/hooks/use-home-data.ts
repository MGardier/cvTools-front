import { useQuery } from "@tanstack/react-query";

import { homeService } from "@/lib/api/home/home.service";
import { useMe } from "@/shared/hooks/useMe";

export const HOME_QUERY_KEY = "home";

export const useHomeData = () => {
  const { user } = useMe();

  const query = useQuery({
    queryKey: [HOME_QUERY_KEY, user?.id],
    queryFn: homeService.getHomeData,
    enabled: !!user,
    staleTime: 60 * 1000,
  });

  return {
    ...query,
    homeData: query.data?.data ?? null,
  };
};
