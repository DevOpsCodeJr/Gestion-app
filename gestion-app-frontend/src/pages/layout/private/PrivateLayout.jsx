import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAppContext } from '../../../hooks/useAppContext'

export default function PrivateLayout() {
    const { auth, loading } = useAppContext()

    if (loading) {
        return <h2>Cargando...</h2>;
    } else {
        return (
            <>
                {true ?
                    <Outlet />
                    :
                    <Navigate to="/login" />
                }
            </>
        )
    }
}