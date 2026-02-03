export default function Input({
    label,
    type = 'text',
    name,
    value,
    onChange,
    placeholder,
    error,
    required = false
}) {
    return (
        <div className="mb-4">
            {label && (
                <label htmlFor={name} className="block text-sm font-medium text-dark-300 mb-1">
                    {label} {required && <span className="text-danger">*</span>}
                </label>
            )}
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`w-full px-3 py-2 bg-dark-800 border rounded-lg text-dark-100 placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all ${error ? 'border-danger' : 'border-dark-600'
                    }`}
            />
            {error && <p className="mt-1 text-sm text-danger">{error}</p>}
        </div>
    )
}
