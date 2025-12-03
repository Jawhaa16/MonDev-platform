'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import api from '@/lib/api'

export default function ProfilePage() {
    const router = useRouter()
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [editing, setEditing] = useState(false)
    const [formData, setFormData] = useState({
        full_name: '',
        bio: ''
    })

    useEffect(() => {
        fetchUser()
    }, [])

    const fetchUser = async () => {
        try {
            const token = localStorage.getItem('access_token')
            if (!token) {
                router.push('/login')
                return
            }

            const response = await api.get('/api/auth/me')
            setUser(response.data)
            setFormData({
                full_name: response.data.full_name || '',
                bio: response.data.bio || ''
            })
        } catch (error) {
            console.error('Failed to fetch user:', error)
            router.push('/login')
        } finally {
            setLoading(false)
        }
    }

    const handleUpdate = async () => {
        try {
            setLoading(true)
            const response = await api.put('/api/users/profile', formData)
            setUser(response.data)
            setEditing(false)

            // Update localStorage
            localStorage.setItem('user', JSON.stringify(response.data))
        } catch (error) {
            console.error('Failed to update profile:', error)
            alert('Мэдээлэл шинэчлэхэд алдаа гарлаа')
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <>
                <Header />
                <main className="min-h-screen bg-black pt-24 pb-12">
                    <div className="max-w-4xl mx-auto px-4">
                        <div className="animate-pulse">
                            <div className="h-10 bg-gray-800 rounded w-1/3 mb-8"></div>
                            <div className="h-64 bg-gray-800 rounded"></div>
                        </div>
                    </div>
                </main>
            </>
        )
    }

    return (
        <>
            <Header />

            <main className="min-h-screen bg-black pt-24 pb-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold mb-8">Миний профайл</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Profile Card */}
                        <div className="lg:col-span-1">
                            <Card>
                                <div className="text-center">
                                    {/* Avatar */}
                                    <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-r from-accent to-blue-600 flex items-center justify-center text-5xl font-bold">
                                        {user?.full_name?.[0] || user?.email?.[0] || 'U'}
                                    </div>

                                    <h2 className="text-2xl font-bold mb-2 px-4 truncate">
                                        {user?.full_name || 'Хэрэглэгч'}
                                    </h2>

                                    <p className="text-gray-400 mb-1">{user?.email}</p>

                                    <div className="inline-block px-3 py-1 bg-gray-700 rounded-full text-sm mt-3">
                                        {user?.user_type === 'instructor' ? '👨‍🏫 Багш' : '👨‍🎓 Суралцагч'}
                                    </div>

                                    <div className="mt-6 text-sm text-gray-500">
                                        Бүртгүүлсэн: {new Date(user?.created_at).toLocaleDateString('mn-MN')}
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Details */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Personal Info */}
                            <Card>
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-2xl font-semibold">Хувийн мэдээлэл</h3>

                                    {!editing ? (
                                        <Button
                                            onClick={() => setEditing(true)}
                                            variant="outline"
                                            size="sm"
                                        >
                                            Засах
                                        </Button>
                                    ) : (
                                        <div className="flex gap-2">
                                            <Button
                                                onClick={() => {
                                                    setEditing(false)
                                                    setFormData({
                                                        full_name: user?.full_name || '',
                                                        bio: user?.bio || ''
                                                    })
                                                }}
                                                variant="secondary"
                                                size="sm"
                                            >
                                                Цуцлах
                                            </Button>
                                            <Button
                                                onClick={handleUpdate}
                                                variant="primary"
                                                size="sm"
                                                disabled={loading}
                                            >
                                                Хадгалах
                                            </Button>
                                        </div>
                                    )}
                                </div>

                                {editing ? (
                                    <div className="space-y-4">
                                        <Input
                                            label="Нэр"
                                            value={formData.full_name}
                                            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                            placeholder="Таны нэр"
                                        />

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Танилцуулга
                                            </label>
                                            <textarea
                                                value={formData.bio}
                                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                                placeholder="Өөрийнхөө тухай бичих..."
                                                rows={4}
                                                className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all resize-none"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div>
                                            <div className="text-sm text-gray-400 mb-1">Нэр</div>
                                            <div className="font-semibold">{user?.full_name || 'Тодорхойгүй'}</div>
                                        </div>

                                        <div>
                                            <div className="text-sm text-gray-400 mb-1">Танилцуулга</div>
                                            <div className="text-gray-300">
                                                {user?.bio || 'Танилцуулга бичээгүй байна'}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </Card>

                            {/* Quick Links */}
                            <Card>
                                <h3 className="text-2xl font-semibold mb-4">Шуурхай холбоосууд</h3>

                                <div className="space-y-3">
                                    <Link
                                        href="/courses"
                                        className="flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all border border-gray-700 group"
                                    >
                                        <span className="font-medium">Хичээлүүд үзэх</span>
                                        <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>

                                    {user?.user_type === 'instructor' && (
                                        <Link
                                            href="/instructor"
                                            className="flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all border border-gray-700 group"
                                        >
                                            <span className="font-medium">Багшийн dashboard</span>
                                            <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </Link>
                                    )}

                                    <Link
                                        href="/settings"
                                        className="flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all border border-gray-700 group"
                                    >
                                        <span className="font-medium">Тохиргоо</span>
                                        <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </Link>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    )
}
