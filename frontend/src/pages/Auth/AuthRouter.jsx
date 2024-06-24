// import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'
import { useSelector } from 'react-redux'

const AuthRoutes = () => {

    const { userInfo } = useSelector((state) => state.auth)

    return userInfo ? (<>
        <Navigate to={'/'} replace />

    </>

    ) : <Outlet />
}

export default AuthRoutes