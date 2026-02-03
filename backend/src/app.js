const express = require('express')
const cors = require('cors')
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const taskRoutes = require('./routes/taskRoutes')

require('dotenv').config()

const app = express()

// middleware
app.use(cors())
app.use(express.json())

// routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1', userRoutes)
app.use('/api/v1/tasks', taskRoutes)

app.get('/api/v1/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

module.exports = app
