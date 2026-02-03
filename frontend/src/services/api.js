const API_URL = '/api/v1'

const getToken = () => localStorage.getItem('token')

const headers = () => ({
    'Content-Type': 'application/json',
    ...(getToken() && { Authorization: `Bearer ${getToken()}` })
})

const handleResponse = async (res) => {
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Something went wrong')
    return data
}

export const authService = {
    async signup(userData) {
        const res = await fetch(`${API_URL}/auth/signup`, {
            method: 'POST',
            headers: headers(),
            body: JSON.stringify(userData)
        })
        return handleResponse(res)
    },

    async login(credentials) {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: headers(),
            body: JSON.stringify(credentials)
        })
        return handleResponse(res)
    },

    async getProfile() {
        const res = await fetch(`${API_URL}/me`, { headers: headers() })
        return handleResponse(res)
    },

    async updateProfile(data) {
        const res = await fetch(`${API_URL}/me`, {
            method: 'PUT',
            headers: headers(),
            body: JSON.stringify(data)
        })
        return handleResponse(res)
    }
}

export const taskService = {
    async getTasks(filters = {}) {
        const params = new URLSearchParams()
        Object.entries(filters).forEach(([key, val]) => {
            if (val) params.append(key, val)
        })
        const res = await fetch(`${API_URL}/tasks?${params}`, { headers: headers() })
        return handleResponse(res)
    },

    async getTask(id) {
        const res = await fetch(`${API_URL}/tasks/${id}`, { headers: headers() })
        return handleResponse(res)
    },

    async createTask(data) {
        const res = await fetch(`${API_URL}/tasks`, {
            method: 'POST',
            headers: headers(),
            body: JSON.stringify(data)
        })
        return handleResponse(res)
    },

    async updateTask(id, data) {
        const res = await fetch(`${API_URL}/tasks/${id}`, {
            method: 'PUT',
            headers: headers(),
            body: JSON.stringify(data)
        })
        return handleResponse(res)
    },

    async deleteTask(id) {
        const res = await fetch(`${API_URL}/tasks/${id}`, {
            method: 'DELETE',
            headers: headers()
        })
        return handleResponse(res)
    }
}
