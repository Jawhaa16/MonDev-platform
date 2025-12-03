interface CardProps {
    children: React.ReactNode
    hover?: boolean
    padding?: 'sm' | 'md' | 'lg'
    className?: string
}

export default function Card({
    children,
    hover = false,
    padding = 'md',
    className = ''
}: CardProps) {
    const paddings = {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8'
    }

    return (
        <div className={`
      bg-gray-800 rounded-xl border border-gray-700
      ${hover ? 'hover:bg-gray-750 hover:border-gray-600 transition-all cursor-pointer' : ''}
      ${paddings[padding]}
      ${className}
    `}>
            {children}
        </div>
    )
}
