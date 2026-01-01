'use client'

import { useState } from 'react'

interface InputProps {
    label?: string
    type?: string
    placeholder?: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    error?: string
    required?: boolean
    disabled?: boolean
    className?: string
    helperText?: string
    min?: string
}

export default function Input({
    label,
    type = 'text',
    placeholder,
    value,
    onChange,
    error,
    required = false,
    disabled = false,
    className = '',
    helperText,
    min
}: InputProps) {
    const isPasswordField = type === 'password'

    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-gray-300 mb-2">
                    {label}
                    {required && <span className="text-accent ml-1">*</span>}
                </label>
            )}

            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                disabled={disabled}
                min={min}
                className={`
          w-full px-4 py-3 
          bg-gray-800 text-white 
          border ${error ? 'border-red-500' : 'border-gray-700'}
          rounded-lg 
          focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all
          ${className}
        `}
            />

            {error && (
                <p className="mt-1 text-sm text-red-500">{error}</p>
            )}

            {helperText && !error && (
                <p className="mt-1 text-sm text-gray-400">{helperText}</p>
            )}
        </div>
    )
}
