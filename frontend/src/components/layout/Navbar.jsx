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
        <nav className="bg-dark-800 border-b border-dark-700 px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link to="/dashboard" className="text-xl font-bold text-primary-500">
                    TaskFlow
                </Link>

                {user && (
                    <div className="flex items-center gap-4">
                        <span className="text-dark-300 text-sm hidden sm:block">
                            {user.email}
                        </span>
                        <Button variant="secondary" onClick={handleLogout}>
                            Logout
                        </Button>
                    </div>
                )}
            </div>
        </nav>
    )
}
