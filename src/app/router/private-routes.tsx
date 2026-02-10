import { ROUTES } from "@/app/constants/routes"
import { useMe } from "@/shared/hooks/useMe"
import { Navigate, Outlet } from 'react-router-dom'

export const PrivateRoutes = () => {
    const { user, isPending } = useMe();

    if (isPending) return null;

    return (
        user ? <Outlet/> : <Navigate to={ROUTES.auth.signIn}/>
    )
}
