import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLocation, Navigate, Outlet } from 'react-router-dom'

const RequireAuth = () => {
    const { usr, setUsr } = useAuthContext()
    const location = useLocation()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'))
        if (storedUser) {
            setUsr(storedUser)
        }
        setLoading(false)
    }, [setUsr])

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <>
            {
                (usr?.accessToken ) ?
                    <Outlet />
                    : <Navigate to='/login' state={{ from: location }} replace />
            }
        </>
    )
}

export default RequireAuth
