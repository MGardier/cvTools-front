import { ROUTES } from '@/common/data/routes';

import { useCookieStore } from '@/common/store/cookie.store';
import { useAuthStore } from '@/modules/Auth/store/auth.store';
import axios, { AxiosError, type AxiosInstance } from 'axios';


const NEEDED_REFRESH_ROUTES = [`auth/logout`, `auth/refresh`]


const axiosClient = (): AxiosInstance => {

  const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },

  });


  axiosClient.interceptors.request.use(
    (request) => {
      const authStore = useAuthStore.getState();
      const cookieStore = useCookieStore.getState();
      if (request.url && cookieStore.getRefreshToken() && NEEDED_REFRESH_ROUTES.includes(request.url))
        request.headers.Authorization = `Bearer ${cookieStore.getRefreshToken() }`
      else
        request.headers.Authorization = `Bearer ${authStore.accessToken}`
      return request;
    }
  )

  axiosClient.interceptors.response.use(
    (response) =>
      response.data
    ,
    async (error: AxiosError) => {

      const authStore = useAuthStore.getState();
      const cookieStore = useCookieStore.getState();
      const originalRequest = error.config

      if (error.response?.status === 401
        && !originalRequest?.url?.includes('auth')
        && !(originalRequest as any)?._retry) {

        (originalRequest as any)._retry = true;

        if (cookieStore.getRefreshToken()  && originalRequest) {

          const response = await axiosClient.post(`auth/refresh`)
          if (response.status === 201) {

            authStore.setAuth({accessToken :response.data.tokens.accessToken, user: response.data.user });
            cookieStore.setRefreshToken(response.data.tokens.refreshToken);
            originalRequest.headers.Authorization = `Bearer ${response.data.tokens.refreshToken}`

            return axiosClient(originalRequest);
          }
        }

        window.location.href = ROUTES.auth.signIn
        return Promise.reject(error.response.data);
      }
      return Promise.reject(error.response?.data);
    }

  );

  return axiosClient;
};

export const apiClient = axiosClient();
