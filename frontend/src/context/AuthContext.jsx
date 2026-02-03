import { createContext, useContext, useState, useEffect } from 'react'
import { authService } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        checkAuth()
    }, [])

    const checkAuth = async () => {
        const token = localStorage.getItem('token')
        if (token) {
            try {
                const { user } = await authService.getProfile()
                setUser(user)
            } catch {
                localStorage.removeItem('token')
            }
        }
        setLoading(false)
    }

    const login = async (credentials) => {
        const { token, user } = await authService.login(credentials)
        localStorage.setItem('token', token)
        setUser(user)
    }

    const signup = async (userData) => {
        const { token, user } = await authService.signup(userData)
        localStorage.setItem('token', token)
        setUser(user)
    }

    const logout = () => {
        localStorage.removeItem('token')
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuth must be used within AuthProvider')
    return context
}
