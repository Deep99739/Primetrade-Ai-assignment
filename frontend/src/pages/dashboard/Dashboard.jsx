import { useState, useEffect } from 'react'
import { Navbar } from '../../components/layout'
import { Button, Spinner } from '../../components/common'
import { taskService } from '../../services/api'
import TaskModal from './TaskModal'
import TaskItem from './TaskItem'

export default function Dashboard() {
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [filters, setFilters] = useState({ status: '', priority: '', search: '' })
    const [modalOpen, setModalOpen] = useState(false)
    const [editingTask, setEditingTask] = useState(null)

    useEffect(() => {
        fetchTasks()
    }, [filters.status, filters.priority])

    const fetchTasks = async () => {
        try {
            setLoading(true)
            const { tasks } = await taskService.getTasks(filters)
            setTasks(tasks)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const handleSearch = (e) => {
        e.preventDefault()
        fetchTasks()
    }

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value })
    }

    const handleCreate = () => {
        setEditingTask(null)
        setModalOpen(true)
    }

    const handleEdit = (task) => {
        setEditingTask(task)
        setModalOpen(true)
    }

    const handleDelete = async (id) => {
        if (!confirm('Delete this task?')) return
        try {
            await taskService.deleteTask(id)
            setTasks(tasks.filter(t => t._id !== id))
        } catch (err) {
            setError(err.message)
        }
    }

    const handleSave = async (taskData) => {
        try {
            if (editingTask) {
                const { task } = await taskService.updateTask(editingTask._id, taskData)
                setTasks(tasks.map(t => t._id === task._id ? task : t))
            } else {
                const { task } = await taskService.createTask(taskData)
                setTasks([task, ...tasks])
            }
            setModalOpen(false)
        } catch (err) {
            throw err
        }
    }

    const taskStats = {
        total: tasks.length,
        pending: tasks.filter(t => t.status === 'pending').length,
        inProgress: tasks.filter(t => t.status === 'in-progress').length,
        completed: tasks.filter(t => t.status === 'completed').length
    }

    return (
        <div className="min-h-screen bg-dark-900">
            <Navbar />

            <main className="w-full px-6 lg:px-12 py-8">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white">My Tasks</h1>
                        <p className="text-dark-400 mt-1">Manage and track your daily tasks</p>
                    </div>
                    <Button onClick={handleCreate}>
                        + New Task
                    </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-dark-800 border border-dark-700 rounded-xl p-5">
                        <div className="text-4xl font-bold text-white mb-1">{taskStats.total}</div>
                        <div className="text-dark-400 text-sm">Total Tasks</div>
                    </div>
                    <div className="bg-dark-800 border border-amber-600/30 rounded-xl p-5">
                        <div className="text-4xl font-bold text-amber-400 mb-1">{taskStats.pending}</div>
                        <div className="text-amber-400/70 text-sm">Pending</div>
                    </div>
                    <div className="bg-dark-800 border border-blue-600/30 rounded-xl p-5">
                        <div className="text-4xl font-bold text-blue-400 mb-1">{taskStats.inProgress}</div>
                        <div className="text-blue-400/70 text-sm">In Progress</div>
                    </div>
                    <div className="bg-dark-800 border border-emerald-600/30 rounded-xl p-5">
                        <div className="text-4xl font-bold text-emerald-400 mb-1">{taskStats.completed}</div>
                        <div className="text-emerald-400/70 text-sm">Completed</div>
                    </div>
                </div>

                {/* Filter Bar */}
                <div className="bg-dark-800 border border-dark-700 rounded-xl p-4 mb-6">
                    <form onSubmit={handleSearch} className="flex flex-col lg:flex-row gap-4">
                        <input
                            type="text"
                            name="search"
                            value={filters.search}
                            onChange={handleFilterChange}
                            placeholder="Search tasks..."
                            className="flex-1 px-4 py-3 bg-dark-900 border border-dark-600 rounded-lg text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                        <div className="flex gap-3 flex-wrap">
                            <select
                                name="status"
                                value={filters.status}
                                onChange={handleFilterChange}
                                className="px-4 py-3 bg-dark-900 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                            >
                                <option value="">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                            <select
                                name="priority"
                                value={filters.priority}
                                onChange={handleFilterChange}
                                className="px-4 py-3 bg-dark-900 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                            >
                                <option value="">All Priority</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                            <Button type="submit" variant="secondary">Filter</Button>
                        </div>
                    </form>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400">
                        {error}
                    </div>
                )}

                {/* Task List */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <Spinner size="lg" />
                    </div>
                ) : tasks.length === 0 ? (
                    <div className="bg-dark-800 border border-dark-700 rounded-xl p-16 text-center">
                        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary-500/20 flex items-center justify-center">
                            <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">No tasks yet</h3>
                        <p className="text-dark-400 mb-6">Get started by creating your first task</p>
                        <Button onClick={handleCreate}>+ Create First Task</Button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {tasks.map(task => (
                            <TaskItem
                                key={task._id}
                                task={task}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                )}
            </main>

            {modalOpen && (
                <TaskModal
                    task={editingTask}
                    onSave={handleSave}
                    onClose={() => setModalOpen(false)}
                />
            )}
        </div>
    )
}
