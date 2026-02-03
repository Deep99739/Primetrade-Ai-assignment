import { useState } from 'react'
import { Button, Input, Card } from '../../components/common'

export default function TaskModal({ task, onSave, onClose }) {
    const [formData, setFormData] = useState({
        title: task?.title || '',
        description: task?.description || '',
        status: task?.status || 'pending',
        priority: task?.priority || 'medium',
        dueDate: task?.dueDate ? task.dueDate.split('T')[0] : ''
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!formData.title.trim()) {
            setError('Title is required')
            return
        }

        setLoading(true)
        try {
            await onSave(formData)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
                <h2 className="text-xl font-bold text-dark-100 mb-4">
                    {task ? 'Edit Task' : 'New Task'}
                </h2>

                {error && (
                    <div className="mb-4 p-3 bg-danger/10 border border-danger rounded-lg text-danger text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <Input
                        label="Title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Task title"
                        required
                    />

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-dark-300 mb-1">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Optional description"
                            rows={3}
                            className="w-full px-3 py-2 bg-dark-800 border border-dark-600 rounded-lg text-dark-100 placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-dark-300 mb-1">Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full px-3 py-2 bg-dark-800 border border-dark-600 rounded-lg text-dark-100"
                            >
                                <option value="pending">Pending</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-dark-300 mb-1">Priority</label>
                            <select
                                name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                                className="w-full px-3 py-2 bg-dark-800 border border-dark-600 rounded-lg text-dark-100"
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                    </div>

                    <Input
                        label="Due Date"
                        type="date"
                        name="dueDate"
                        value={formData.dueDate}
                        onChange={handleChange}
                    />

                    <div className="flex gap-3 mt-6">
                        <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
                            Cancel
                        </Button>
                        <Button type="submit" loading={loading} className="flex-1">
                            {task ? 'Update' : 'Create'}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    )
}
