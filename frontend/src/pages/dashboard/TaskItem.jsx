import { Card } from '../../components/common'

const statusColors = {
    pending: 'bg-warning/20 text-warning',
    'in-progress': 'bg-primary-500/20 text-primary-400',
    completed: 'bg-success/20 text-success'
}

const priorityColors = {
    low: 'bg-dark-600 text-dark-300',
    medium: 'bg-primary-500/20 text-primary-400',
    high: 'bg-danger/20 text-danger'
}

export default function TaskItem({ task, onEdit, onDelete }) {
    const formatDate = (date) => {
        if (!date) return null
        return new Date(date).toLocaleDateString()
    }

    const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'completed'

    return (
        <Card className="hover:border-dark-600 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                    <h3 className="text-lg font-medium text-dark-100 mb-1">{task.title}</h3>
                    {task.description && (
                        <p className="text-dark-400 text-sm mb-2">{task.description}</p>
                    )}
                    <div className="flex flex-wrap gap-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[task.status]}`}>
                            {task.status}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${priorityColors[task.priority]}`}>
                            {task.priority}
                        </span>
                        {task.dueDate && (
                            <span className={`px-2 py-1 rounded text-xs font-medium ${isOverdue ? 'bg-danger/20 text-danger' : 'bg-dark-600 text-dark-300'}`}>
                                Due: {formatDate(task.dueDate)}
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => onEdit(task)}
                        className="px-3 py-1 text-sm bg-dark-700 hover:bg-dark-600 rounded text-dark-200 transition-colors"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => onDelete(task._id)}
                        className="px-3 py-1 text-sm bg-danger/20 hover:bg-danger/30 rounded text-danger transition-colors"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </Card>
    )
}
