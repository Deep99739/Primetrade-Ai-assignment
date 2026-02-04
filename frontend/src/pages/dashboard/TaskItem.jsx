const statusStyles = {
    pending: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    'in-progress': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    completed: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
}

const priorityStyles = {
    low: 'bg-slate-500/20 text-slate-400',
    medium: 'bg-orange-500/20 text-orange-400',
    high: 'bg-rose-500/20 text-rose-400'
}

export default function TaskItem({ task, onEdit, onDelete }) {
    const formatDate = (date) => {
        if (!date) return null
        return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }

    const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'completed'

    return (
        <div className="bg-dark-800 border border-dark-700 hover:border-dark-600 rounded-xl p-5 transition-all">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1">
                    <h3 className="text-lg font-medium text-white mb-2">{task.title}</h3>
                    {task.description && (
                        <p className="text-dark-400 text-sm mb-3">{task.description}</p>
                    )}
                    <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-3 py-1 rounded-lg text-xs font-medium border ${statusStyles[task.status]}`}>
                            {task.status.replace('-', ' ')}
                        </span>
                        <span className={`px-3 py-1 rounded-lg text-xs font-medium ${priorityStyles[task.priority]}`}>
                            {task.priority} priority
                        </span>
                        {task.dueDate && (
                            <span className={`px-3 py-1 rounded-lg text-xs font-medium ${isOverdue ? 'bg-rose-500/20 text-rose-400' : 'bg-dark-700 text-dark-300'
                                }`}>
                                Due: {formatDate(task.dueDate)}
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => onEdit(task)}
                        className="px-4 py-2 text-sm bg-dark-700 hover:bg-dark-600 rounded-lg text-white transition-colors"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => onDelete(task._id)}
                        className="px-4 py-2 text-sm bg-rose-500/20 hover:bg-rose-500/30 rounded-lg text-rose-400 transition-colors"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}
