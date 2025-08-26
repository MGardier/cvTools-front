import { ROUTES } from "@/data/routes";
import { useAuthStore } from "@/features/auth/auth.store";
import {  useNavigate, useSearchParams } from "react-router-dom";



export function OauthSuccessPage() {
  
  const authStore = useAuthStore();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
   const accessToken = searchParams.get('accessToken');
  const refreshToken = searchParams.get('refreshToken'); 

  if(!accessToken && !refreshToken)
    navigate(ROUTES.auth.signIn)
  authStore.setAccessToken(accessToken!)
  authStore.setRefreshToken(refreshToken!)
  
  navigate(ROUTES.home)

  return (<></>)
}
