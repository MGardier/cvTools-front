import { ROUTES } from '@/common/data/routes'
import { useAuthStore } from '@/features/auth/auth.store'
import { Navigate, Outlet } from 'react-router-dom'
export const PrivateRoutes = () => {

    const {accessToken} = useAuthStore();
  
return (
    accessToken ? <Outlet/> : <Navigate to={ROUTES.auth.signIn}/>
  )
}