const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')

require('dotenv').config()

const app = express()

// middleware
app.use(cors())
app.use(express.json())

// routes will be added here
app.get('/api/v1/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

module.exports = app
