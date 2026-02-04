import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Button } from '../common'

export default function Navbar() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <nav className="bg-dark-800 border-b border-dark-700 px-6 lg:px-12 py-4">
            <div className="flex items-center justify-between">
                <Link to="/dashboard" className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-500 flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                    </div>
                    <span className="text-xl font-bold text-white">TaskFlow</span>
                </Link>

                {user && (
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-primary-500 flex items-center justify-center">
                                <span className="text-white font-medium">
                                    {user.name?.charAt(0).toUpperCase() || 'U'}
                                </span>
                            </div>
                            <span className="text-dark-300">{user.email}</span>
                        </div>
                        <Button variant="secondary" onClick={handleLogout}>Logout</Button>
                    </div>
                )}
            </div>
        </nav>
    )
}
