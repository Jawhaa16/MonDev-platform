'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import api from '@/lib/api'

export default function InstructorDashboard() {
    const router = useRouter()
    const [user, setUser] = useState<any>(null)
    const [myCourses, setMyCourses] = useState<any[]>([])
    const [stats, setStats] = useState({
        totalCourses: 0,
        totalEarnings: 0,
        totalStudents: 0
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        checkAuth()
    }, [])

    const checkAuth = async () => {
        try {
            const token = localStorage.getItem('access_token')
            if (!token) {
                router.push('/login')
                return
            }

            const response = await api.get('/api/auth/me')
            const userData = response.data

            if (userData.user_type !== 'instructor') {
                alert('Зөвхөн багш нар хандах эрхтэй')
                router.push('/profile')
                return
            }

            setUser(userData)
            await fetchCourses(userData.id)
        } catch (error) {
            console.error('Auth failed:', error)
            router.push('/login')
        } finally {
            setLoading(false)
        }
    }

    const fetchCourses = async (instructorId: string) => {
        try {
            const response = await api.get('/api/courses', {
                params: { instructor_id: instructorId }
            })

            setMyCourses(response.data.courses || [])
            setStats({
                totalCourses: response.data.total || 0,
                totalEarnings: 0, // TODO: Add earnings calculation
                totalStudents: 0  // TODO: Add students count
            })
        } catch (error) {
            console.error('Failed to fetch courses:', error)
        }
    }

    if (loading) {
        return (
            <>
                <Header />
                <main className="min-h-screen bg-black pt-24 pb-12">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="animate-pulse">
                            <div className="h-10 bg-gray-800 rounded w-1/3 mb-8"></div>
                            <div className="grid grid-cols-3 gap-4 mb-8">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="h-32 bg-gray-800 rounded"></div>
                                ))}
                            </div>
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
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-4xl font-bold mb-2">Багшийн Dashboard</h1>
                            <p className="text-gray-400">Сайн байна уу, {user?.full_name}!</p>
                        </div>

                        <Button
                            href="/instructor/create-course"
                            variant="primary"
                        >
                            + Шинэ хичээл
                        </Button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <Card>
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-gray-400 text-sm mb-1">Нийт хичээл</div>
                                    <div className="text-3xl font-bold">{stats.totalCourses}</div>
                                </div>
                                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                            </div>
                        </Card>

                        <Card>
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-gray-400 text-sm mb-1">Нийт орлого</div>
                                    <div className="text-3xl font-bold">{stats.totalEarnings.toLocaleString()}₮</div>
                                </div>
                                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                        </Card>

                        <Card>
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-gray-400 text-sm mb-1">Суралцагчид</div>
                                    <div className="text-3xl font-bold">{stats.totalStudents}</div>
                                </div>
                                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* My Courses */}
                    <Card>
                        <h2 className="text-2xl font-semibold mb-6">Миний хичээлүүд</h2>

                        {myCourses.length === 0 ? (
                            <div className="text-center py-12">
                                <svg className="w-16 h-16 text-gray-700 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                                <p className="text-gray-400 mb-4">Та одоогоор хичээл оруулаагүй байна</p>
                                <Button href="/instructor/create-course" variant="primary">
                                    Эхний хичээлээ үүсгэх
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {myCourses.map((course) => (
                                    <div
                                        key={course.id}
                                        className="flex items-center justify-between p-4 bg-gray-900 rounded-lg hover:bg-gray-800 transition-all"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className="w-20 h-20 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg"></div>
                                            <div>
                                                <h3 className="font-semibold text-lg mb-1">{course.title}</h3>
                                                <div className="flex items-center space-x-4 text-sm text-gray-400">
                                                    <span>
                                                        {course.is_free ? 'Үнэгүй' : `${course.price?.toLocaleString()}₮`}
                                                    </span>
                                                    <span>•</span>
                                                    <span>{course.videos?.length || 0} видео</span>
                                                    <span>•</span>
                                                    <span className={course.is_published ? 'text-green-400' : 'text-yellow-400'}>
                                                        {course.is_published ? 'Нийтлэгдсэн' : 'Ноорог'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Button
                                                href={`/courses/${course.id}`}
                                                variant="secondary"
                                                size="sm"
                                            >
                                                Үзэх
                                            </Button>
                                            <Button
                                                href={`/instructor/edit-course/${course.id}`}
                                                variant="outline"
                                                size="sm"
                                            >
                                                Засах
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </Card>
                </div>
            </main>

            <Footer />
        </>
    )
}
