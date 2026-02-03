export default function Button({
    children,
    type = 'button',
    variant = 'primary',
    disabled = false,
    loading = false,
    onClick,
    className = ''
}) {
    const baseStyles = 'px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'

    const variants = {
        primary: 'bg-primary-500 hover:bg-primary-600 text-white',
        secondary: 'bg-dark-700 hover:bg-dark-600 text-dark-100 border border-dark-600',
        danger: 'bg-danger hover:bg-red-700 text-white'
    }

    return (
        <button
            type={type}
            disabled={disabled || loading}
            onClick={onClick}
            className={`${baseStyles} ${variants[variant]} ${className}`}
        >
            {loading && (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
            )}
            {children}
        </button>
    )
}
