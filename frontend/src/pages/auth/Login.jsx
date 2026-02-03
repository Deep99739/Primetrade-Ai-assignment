import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Button, Input, Card } from '../../components/common'

export default function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!formData.email || !formData.password) {
            setError('Please fill in all fields')
            return
        }

        setLoading(true)
        try {
            await login(formData)
            navigate('/dashboard')
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-dark-900 px-4">
            <Card className="w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6 text-primary-500">
                    Welcome Back
                </h1>

                {error && (
                    <div className="mb-4 p-3 bg-danger/10 border border-danger rounded-lg text-danger text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <Input
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        required
                    />
                    <Input
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        required
                    />
                    <Button type="submit" loading={loading} className="w-full mt-2">
                        Sign In
                    </Button>
                </form>

                <p className="text-center mt-6 text-dark-400 text-sm">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-primary-500 hover:underline">
                        Sign up
                    </Link>
                </p>
            </Card>
        </div>
    )
}
