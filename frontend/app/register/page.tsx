'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Card from '@/components/ui/Card'
import Link from 'next/link'

export default function RegisterPage() {
    const [userType, setUserType] = useState<'viewer' | 'instructor'>('viewer')
    const [isLoading, setIsLoading] = useState(false)

    const handleGoogleRegister = () => {
        setIsLoading(true)
        const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
            `client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&` +
            `redirect_uri=${encodeURIComponent(process.env.NEXT_PUBLIC_FRONTEND_URL + '/auth/callback')}&` +
            `response_type=code&` +
            `scope=openid email profile&` +
            `access_type=offline&` +
            `state=${userType}&` +
            `prompt=select_account`
        window.location.href = googleAuthUrl
    }

    return (
        <>
            <Header />

            <main className="min-h-screen bg-black pt-24 pb-12 px-4">
                <div className="max-w-md mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold mb-4">Бүртгүүлэх</h1>
                        <p className="text-gray-400">
                            MonDev.mn-д нэгдэж, сурах эсвэл зааж эхлээрэй
                        </p>
                    </div>

                    <Card>
                        <div className="space-y-6">
                            {/* User Type Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-3">
                                    Та ямар хэрэглэгч болох вэ? <span className="text-accent">*</span>
                                </label>

                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() => setUserType('viewer')}
                                        type="button"
                                        className={`
                                            p-6 rounded-xl border-2 transition-all
                                            ${userType === 'viewer'
                                                ? 'border-accent bg-accent/10'
                                                : 'border-gray-700 hover:border-gray-600'
                                            }
                                        `}
                                    >
                                        <div className="text-4xl mb-3">👨‍🎓</div>
                                        <div className="font-semibold mb-1">Суралцагч</div>
                                        <div className="text-sm text-gray-400">Хичээл үзэх</div>
                                    </button>

                                    <button
                                        onClick={() => setUserType('instructor')}
                                        type="button"
                                        className={`
                                            p-6 rounded-xl border-2 transition-all
                                            ${userType === 'instructor'
                                                ? 'border-accent bg-accent/10'
                                                : 'border-gray-700 hover:border-gray-600'
                                            }
                                        `}
                                    >
                                        <div className="text-4xl mb-3">👨‍🏫</div>
                                        <div className="font-semibold mb-1">Багш</div>
                                        <div className="text-sm text-gray-400">Хичээл оруулах</div>
                                    </button>
                                </div>
                            </div>

                            {/* Info Box */}
                            {userType === 'instructor' && (
                                <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                                    <div className="flex items-start space-x-3">
                                        <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <div className="text-sm text-gray-300">
                                            Багшаар бүртгүүлснээр та өөрийн хичээлүүдийг оруулж, орлого олох боломжтой болно.
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Google Sign Up Button */}
                            <button
                                onClick={handleGoogleRegister}
                                disabled={isLoading}
                                className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-all disabled:opacity-50"
                            >
                                <svg className="w-6 h-6" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                <span>
                                    Google-ээр бүртгүүлэх
                                </span>
                            </button>

                            <div className="text-center text-sm text-gray-400">
                                <p>
                                    Аль хэдийн бүртгэлтэй юу?{' '}
                                    <Link href="/login" className="text-accent hover:text-blue-400 font-semibold">
                                        Нэвтрэх
                                    </Link>
                                </p>
                            </div>

                            {/* Terms */}
                            <div className="text-xs text-gray-500 text-center">
                                Бүртгүүлснээр та манай{' '}
                                <Link href="/terms" className="text-accent hover:underline">
                                    Үйлчилгээний нөхцөл
                                </Link>
                                {' '}болон{' '}
                                <Link href="/privacy" className="text-accent hover:underline">
                                    Нууцлалын бодлого
                                </Link>
                                -той зөвшөөрч байна.
                            </div>
                        </div>
                    </Card>
                </div>
            </main>

            <Footer />
        </>
    )
}
