export default function Card({ children, className = '' }) {
    return (
        <div className={`bg-dark-800 border border-dark-700 rounded-xl p-6 ${className}`}>
            {children}
        </div>
    )
}
