'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import api from '@/lib/api'

export default function InstructorProfilePage({ params }: { params: { id: string } }) {
    const router = useRouter()
    const [instructor, setInstructor] = useState<any>(null)
    const [courses, setCourses] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchInstructorData()
    }, [params.id])

    const fetchInstructorData = async () => {
        try {
            // Fetch instructor info
            const instructorResponse = await api.get(`/api/users/${params.id}`)
            setInstructor(instructorResponse.data)

            // Fetch instructor's courses
            const coursesResponse = await api.get('/api/courses', {
                params: { instructor_id: params.id }
            })
            setCourses(coursesResponse.data.courses || [])
        } catch (error) {
            console.error('Failed to fetch instructor data:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <>
                <Header />
                <main className="min-h-screen bg-black pt-24 pb-12 flex items-center justify-center">
                    <div className="text-white text-xl">Уншиж байна...</div>
                </main>
            </>
        )
    }

    if (!instructor) {
        return (
            <>
                <Header />
                <main className="min-h-screen bg-black pt-24 pb-12 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl text-white mb-4">Багш олдсонгүй</h1>
                        <button
                            onClick={() => router.push('/instructors')}
                            className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Буцах
                        </button>
                    </div>
                </main>
            </>
        )
    }

    return (
        <>
            <Header />
            <main className="min-h-screen bg-black pt-24 pb-12">
                {/* Hero Section */}
                <section className="px-4 mb-12">
                    <div className="max-w-7xl mx-auto">
                        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
                            <div className="relative h-64 bg-gradient-to-br from-accent/20 to-blue-600/20">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    {instructor.profile_image ? (
                                        <img
                                            src={instructor.profile_image}
                                            alt={instructor.full_name}
                                            className="w-40 h-40 rounded-full object-cover border-4 border-gray-800"
                                        />
                                    ) : (
                                        <div className="w-40 h-40 rounded-full bg-gradient-to-br from-accent to-blue-600 flex items-center justify-center text-6xl font-bold text-white border-4 border-gray-800">
                                            {instructor.full_name?.[0]?.toUpperCase() || 'U'}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="p-8 text-center">
                                <h1 className="text-4xl font-bold text-white mb-2">
                                    {instructor.full_name || 'Багш'}
                                </h1>
                                <p className="text-accent mb-4">{instructor.email}</p>
                                {instructor.bio && (
                                    <p className="text-gray-400 max-w-3xl mx-auto">
                                        {instructor.bio}
                                    </p>
                                )}

                                <div className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-400">
                                    <div>
                                        <span className="font-semibold text-accent text-lg">{courses.length}</span>
                                        <span className="ml-2">Хичээл</span>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-accent text-lg">
                                            {new Date(instructor.created_at).toLocaleDateString('mn-MN')}
                                        </span>
                                        <span className="ml-2">-с эхлэн</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Courses Section */}
                <section className="px-4">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-3xl font-bold text-white mb-8">Хичээлүүд</h2>

                        {courses.length === 0 ? (
                            <div className="text-center py-16 bg-gray-900 rounded-xl border border-gray-800">
                                <p className="text-gray-400">Одоогоор хичээл байхгүй байна</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {courses.map(course => (
                                    <div
                                        key={course.id}
                                        onClick={() => router.push(`/courses/${course.id}`)}
                                        className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden hover:border-accent transition-all cursor-pointer group"
                                    >
                                        <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                                            <div className="text-6xl">📚</div>
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors">
                                                {course.title}
                                            </h3>
                                            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                                {course.description}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-accent font-bold">
                                                    {course.is_free ? 'Үнэгүй' : `${course.price?.toLocaleString()}₮`}
                                                </span>
                                                <span className={`text-xs px-2 py-1 rounded ${course.is_published ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                                                    }`}>
                                                    {course.is_published ? 'Нийтлэгдсэн' : 'Ноорог'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}
