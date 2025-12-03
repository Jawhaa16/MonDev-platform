import Link from 'next/link'

interface ButtonProps {
    children: React.ReactNode
    variant?: 'primary' | 'secondary' | 'outline'
    size?: 'sm' | 'md' | 'lg'
    href?: string
    onClick?: () => void
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    className?: string
}

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    href,
    onClick,
    type = 'button',
    disabled = false,
    className = ''
}: ButtonProps) {
    const baseStyles = 'font-semibold rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'

    const variants = {
        primary: 'bg-accent text-white hover:bg-blue-600 shadow-lg hover:shadow-accent/50',
        secondary: 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700',
        outline: 'bg-transparent text-white hover:bg-gray-800 border-2 border-accent'
    }

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg'
    }

    const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`

    if (href) {
        return (
            <Link href={href} className={classes}>
                {children}
            </Link>
        )
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={classes}
        >
            {children}
        </button>
    )
}
