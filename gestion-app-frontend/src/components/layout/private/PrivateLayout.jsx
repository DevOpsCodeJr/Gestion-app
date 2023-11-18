import React from 'react'
import { Navigate } from 'react-router-dom'
import Private from './Private'
import { useAppContext } from '../../../hooks/useAppContext'

export default function PrivateLayout() {
    const { auth } = useAppContext()

    return (
        <>
            <section>
                {auth._id ?
                    <Private />
                    :
                    <Navigate to="/login" />
                }
            </section>
        </>
    )
}