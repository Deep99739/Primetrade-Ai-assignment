const Task = require('../models/Task')

exports.getTasks = async (req, res) => {
    try {
        const { status, priority, search, sort } = req.query

        let query = { user: req.user._id }

        if (status) query.status = status
        if (priority) query.priority = priority
        if (search) {
            query.title = { $regex: search, $options: 'i' }
        }

        let sortOption = { createdAt: -1 }
        if (sort === 'dueDate') sortOption = { dueDate: 1 }
        if (sort === 'priority') sortOption = { priority: -1 }

        const tasks = await Task.find(query).sort(sortOption)

        res.json({ success: true, count: tasks.length, tasks })
    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }
}

exports.getTask = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, user: req.user._id })

        if (!task) {
            return res.status(404).json({ message: 'Task not found' })
        }

        res.json({ success: true, task })
    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }
}

exports.createTask = async (req, res) => {
    try {
        const task = await Task.create({
            ...req.body,
            user: req.user._id
        })

        res.status(201).json({ success: true, task })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            req.body,
            { new: true, runValidators: true }
        )

        if (!task) {
            return res.status(404).json({ message: 'Task not found' })
        }

        res.json({ success: true, task })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id
        })

        if (!task) {
            return res.status(404).json({ message: 'Task not found' })
        }

        res.json({ success: true, message: 'Task deleted' })
    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }
}
