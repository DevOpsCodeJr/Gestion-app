'use client'

import { useState, useEffect, createContext } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        authUser()
    }, [])

    const authUser = async () => {
        const token = localStorage.getItem('token')
        const user = localStorage.getItem('user')

        const userObject = JSON.parse(user)

        if (!token || !user) {
            setLoading(false)
            return false
        }

        setAuth(userObject)
        setLoading(false)
    }

    return (
        <AuthContext.Provider value={{ auth, setAuth, loading }}>
            {children}
        </AuthContext.Provider>
    )
}
