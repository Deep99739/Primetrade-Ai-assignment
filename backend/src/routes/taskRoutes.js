const express = require('express')
const {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
} = require('../controllers/taskController')
const auth = require('../middleware/auth')

const router = express.Router()

router.use(auth)

router.route('/')
    .get(getTasks)
    .post(createTask)

router.route('/:id')
    .get(getTask)
    .put(updateTask)
    .delete(deleteTask)

module.exports = router
