import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Button, Input, Card } from '../../components/common'

export default function Signup() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' })
    const [errors, setErrors] = useState({})
    const [serverError, setServerError] = useState('')
    const [loading, setLoading] = useState(false)
    const { signup } = useAuth()
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: '' })
        setServerError('')
    }

    const validate = () => {
        const errs = {}
        if (!formData.name.trim()) errs.name = 'Name is required'
        if (!formData.email.trim()) errs.email = 'Email is required'
        else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Invalid email format'
        if (!formData.password) errs.password = 'Password is required'
        else if (formData.password.length < 6) errs.password = 'Password must be at least 6 characters'
        return errs
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const errs = validate()
        if (Object.keys(errs).length > 0) {
            setErrors(errs)
            return
        }

        setLoading(true)
        try {
            await signup(formData)
            navigate('/dashboard')
        } catch (err) {
            setServerError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-dark-900 px-4">
            <Card className="w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6 text-primary-500">
                    Create Account
                </h1>

                {serverError && (
                    <div className="mb-4 p-3 bg-danger/10 border border-danger rounded-lg text-danger text-sm">
                        {serverError}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <Input
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        error={errors.name}
                        required
                    />
                    <Input
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        error={errors.email}
                        required
                    />
                    <Input
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="At least 6 characters"
                        error={errors.password}
                        required
                    />
                    <Button type="submit" loading={loading} className="w-full mt-2">
                        Create Account
                    </Button>
                </form>

                <p className="text-center mt-6 text-dark-400 text-sm">
                    Already have an account?{' '}
                    <Link to="/login" className="text-primary-500 hover:underline">
                        Sign in
                    </Link>
                </p>
            </Card>
        </div>
    )
}
