'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import api from '@/lib/api'

export default function AuthCallback() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [error, setError] = useState<string | null>(null)
    const [isProcessing, setIsProcessing] = useState(true)

    useEffect(() => {
        const handleCallback = async () => {
            const code = searchParams.get('code')
            const state = searchParams.get('state')
            const errorParam = searchParams.get('error')

            // Handle OAuth errors
            if (errorParam) {
                setError('Нэвтрэх үйлдэл цуцлагдлаа')
                setIsProcessing(false)
                setTimeout(() => router.push('/login'), 3000)
                return
            }

            // Validate code
            if (!code) {
                setError('Алдаа гарлаа. Дахин оролдоно уу.')
                setIsProcessing(false)
                setTimeout(() => router.push('/login'), 3000)
                return
            }

            try {
                // Exchange code for tokens
                const response = await api.post('/api/auth/google/callback', {
                    code,
                    user_type: state || 'viewer' // default to viewer
                })

                const { access_token, refresh_token, user } = response.data

                // Store tokens and user data
                localStorage.setItem('access_token', access_token)
                localStorage.setItem('refresh_token', refresh_token)
                localStorage.setItem('user', JSON.stringify(user))

                // Redirect based on user type
                if (user.user_type === 'instructor') {
                    router.push('/instructor')
                } else {
                    router.push('/profile')
                }
            } catch (err: any) {
                console.error('OAuth callback error:', err)
                let errorMessage = 'Нэвтрэх үед алдаа гарлаа. Дахин оролдоно уу.'
                if (err.response?.data?.detail) {
                    if (typeof err.response.data.detail === 'string') {
                        errorMessage = err.response.data.detail
                    } else {
                        errorMessage = JSON.stringify(err.response.data.detail)
                    }
                }
                setError(errorMessage)
                setIsProcessing(false)
                setTimeout(() => router.push('/login'), 3000)
            }
        }

        handleCallback()
    }, [searchParams, router])

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                {isProcessing ? (
                    <>
                        {/* Loading Animation */}
                        <div className="mb-8">
                            <div className="w-16 h-16 mx-auto border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-2">
                            Нэвтэрч байна...
                        </h1>
                        <p className="text-gray-400">
                            Таны мэдээллийг баталгаажуулж байна
                        </p>
                    </>
                ) : error ? (
                    <>
                        {/* Error State */}
                        <div className="mb-8">
                            <svg
                                className="w-16 h-16 mx-auto text-red-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-2">
                            Алдаа гарлаа
                        </h1>
                        <p className="text-gray-400 mb-4">
                            {error}
                        </p>
                        <p className="text-sm text-gray-500">
                            Нэвтрэх хуудас руу шилжүүлж байна...
                        </p>
                    </>
                ) : null}
            </div>
        </div>
    )
}
