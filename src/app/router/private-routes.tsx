import { ROUTES } from "@/app/constants/routes"
import { useAuthStore } from '@/modules/auth/store/auth.store'
import { Navigate, Outlet } from 'react-router-dom'

export const PrivateRoutes = () => {
    const {accessToken} = useAuthStore();

    return (
        accessToken ? <Outlet/> : <Navigate to={ROUTES.auth.signIn}/>
    )
}
