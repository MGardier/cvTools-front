import { ROUTES } from "@/app/constants/routes";
import { ME_QUERY_KEY } from "@/shared/hooks/useMe";
import { queryClient } from "@/lib/tanstack-query/query-client";
import axios, { AxiosError, type AxiosInstance } from 'axios';


const axiosClient = (): AxiosInstance => {

  const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

  axiosClient.interceptors.response.use(
    (response) =>
      response.data
    ,
    async (error: AxiosError) => {

      const originalRequest = error.config

      if (error.response?.status === 401
        && !originalRequest?.url?.includes('auth')
        && !(originalRequest as any)?._retry) {

        (originalRequest as any)._retry = true;

        if (originalRequest) {
          try {
            await axiosClient.post(`auth/refresh`);
            return axiosClient(originalRequest);
          } catch {
            queryClient.removeQueries({ queryKey: ME_QUERY_KEY });
            window.location.href = ROUTES.auth.signIn;
            return Promise.reject(error.response?.data);
          }
        }
      }
      return Promise.reject(error.response?.data);
    }

  );

  return axiosClient;
};

export const apiClient = axiosClient();
