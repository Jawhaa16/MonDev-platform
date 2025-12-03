'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import api from '@/lib/api'

export default function SettingsPage() {
    const router = useRouter()
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [theme, setTheme] = useState<'light' | 'dark'>('dark')
    const [formData, setFormData] = useState({
        full_name: '',
        bio: '',
        profile_image: ''
    })
    const [imagePreview, setImagePreview] = useState('')

    useEffect(() => {
        fetchUser()
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'dark'
        setTheme(savedTheme)
        applyTheme(savedTheme)
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
                bio: response.data.bio || '',
                profile_image: response.data.profile_image || ''
            })
            if (response.data.profile_image) {
                setImagePreview(response.data.profile_image)
            }
        } catch (error) {
            console.error('Failed to fetch user:', error)
            router.push('/login')
        } finally {
            setLoading(false)
        }
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const applyTheme = (newTheme: 'light' | 'dark') => {
        const html = document.documentElement
        if (newTheme === 'light') {
            html.classList.add('light')
            html.classList.remove('dark')
        } else {
            html.classList.add('dark')
            html.classList.remove('light')
        }
    }

    const handleThemeChange = (newTheme: 'light' | 'dark') => {
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)
        applyTheme(newTheme)
    }

    const handleSave = async () => {
        try {
            setSaving(true)

            const updateData = {
                ...formData,
                profile_image: imagePreview || formData.profile_image
            }

            const response = await api.put('/api/users/profile', updateData)
            setUser(response.data)
            localStorage.setItem('user', JSON.stringify(response.data))

            // Dispatch event to update Header
            window.dispatchEvent(new Event('userUpdated'))

            alert('Мэдээлэл амжилттай шинэчлэгдлээ!')
        } catch (error) {
            console.error('Failed to update profile:', error)
            alert('Мэдээлэл шинэчлэхэд алдаа гарлаа')
        } finally {
            setSaving(false)
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
                    <h1 className="text-4xl font-bold mb-8">Тохиргоо</h1>


                    <div className="space-y-6">
                        {/* Profile Settings */}
                        <Card>
                            <h2 className="text-2xl font-semibold mb-6">Хувийн мэдээлэл</h2>

                            <div className="space-y-6">
                                {/* Profile Image */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Профайл зураг
                                    </label>
                                    <div className="flex items-center space-x-6">
                                        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-accent to-blue-600 flex items-center justify-center text-4xl font-bold overflow-hidden">
                                            {imagePreview ? (
                                                <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
                                            ) : (
                                                <span>{user?.full_name?.[0] || user?.email?.[0] || 'U'}</span>
                                            )}
                                        </div>
                                        <div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="hidden"
                                                id="profile-image"
                                            />
                                            <label
                                                htmlFor="profile-image"
                                                className="cursor-pointer px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors inline-block"
                                            >
                                                Зураг солих
                                            </label>
                                            <p className="text-sm text-gray-400 mt-2">
                                                JPG, PNG эсвэл GIF. Хамгийн ихдээ 5MB.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Full Name */}
                                <Input
                                    label="Нэр"
                                    value={formData.full_name}
                                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                    placeholder="Таны бүтэн нэр"
                                />

                                {/* Bio */}
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

                                {/* Email (readonly) */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Имэйл
                                    </label>
                                    <input
                                        type="email"
                                        value={user?.email || ''}
                                        disabled
                                        className="w-full px-4 py-3 bg-gray-900 text-gray-500 border border-gray-700 rounded-lg cursor-not-allowed"
                                    />
                                </div>

                                {/* Save Button */}
                                <div className="flex gap-4 pt-4">
                                    <Button
                                        onClick={handleSave}
                                        variant="primary"
                                        disabled={saving}
                                    >
                                        {saving ? 'Хадгалж байна...' : 'Хадгалах'}
                                    </Button>
                                    <Button
                                        onClick={() => router.push('/profile')}
                                        variant="secondary"
                                    >
                                        Цуцлах
                                    </Button>
                                </div>
                            </div>
                        </Card>

                        {/* Account Information */}
                        <Card>
                            <h2 className="text-2xl font-semibold mb-4">Бүртгэлийн мэдээлэл</h2>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-3 border-b border-gray-700">
                                    <div>
                                        <div className="font-medium">Хэрэглэгчийн төрөл</div>
                                        <div className="text-sm text-gray-400">
                                            {user?.user_type === 'instructor' ? 'Багш' : 'Суралцагч'}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center py-3 border-b border-gray-700">
                                    <div>
                                        <div className="font-medium">Бүртгүүлсэн огноо</div>
                                        <div className="text-sm text-gray-400">
                                            {new Date(user?.created_at).toLocaleDateString('mn-MN')}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center py-3">
                                    <div>
                                        <div className="font-medium">Бүртгэлийн ID</div>
                                        <div className="text-sm text-gray-400 font-mono text-xs break-all">
                                            {user?.id}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    )
}
