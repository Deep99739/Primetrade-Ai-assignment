import { useState, useEffect } from 'react'
import { Navbar } from '../../components/layout'
import { Button, Card, Spinner, Select } from '../../components/common'
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

    const statusOptions = [
        { value: 'pending', label: 'Pending' },
        { value: 'in-progress', label: 'In Progress' },
        { value: 'completed', label: 'Completed' }
    ]

    const priorityOptions = [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' }
    ]

    return (
        <div className="min-h-screen bg-dark-900">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <h1 className="text-2xl font-bold text-dark-100">My Tasks</h1>
                    <Button onClick={handleCreate}>+ New Task</Button>
                </div>

                <Card className="mb-6">
                    <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                        <input
                            type="text"
                            name="search"
                            value={filters.search}
                            onChange={handleFilterChange}
                            placeholder="Search tasks..."
                            className="flex-1 px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-dark-100 placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                        <div className="flex gap-2 flex-wrap">
                            <select
                                name="status"
                                value={filters.status}
                                onChange={handleFilterChange}
                                className="px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-dark-100"
                            >
                                <option value="">All Status</option>
                                {statusOptions.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                            <select
                                name="priority"
                                value={filters.priority}
                                onChange={handleFilterChange}
                                className="px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-dark-100"
                            >
                                <option value="">All Priority</option>
                                {priorityOptions.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                            <Button type="submit" variant="secondary">Search</Button>
                        </div>
                    </form>
                </Card>

                {error && (
                    <div className="mb-4 p-3 bg-danger/10 border border-danger rounded-lg text-danger">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="py-12"><Spinner size="lg" /></div>
                ) : tasks.length === 0 ? (
                    <Card className="text-center py-12">
                        <p className="text-dark-400">No tasks found. Create your first task!</p>
                    </Card>
                ) : (
                    <div className="grid gap-4">
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
