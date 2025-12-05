'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import PaymentModal from '@/components/course/PaymentModal'
import api from '@/lib/api'

export default function CourseDetailPage() {
    const params = useParams()
    const router = useRouter()
    const courseId = params.id as string

    const [course, setCourse] = useState<any>(null)
    const [hasAccess, setHasAccess] = useState(false)
    const [loading, setLoading] = useState(true)
    const [showPaymentModal, setShowPaymentModal] = useState(false)

    useEffect(() => {
        if (courseId) {
            fetchCourse()
            checkAccess()
        }
    }, [courseId])

    const fetchCourse = async () => {
        try {
            const [courseRes, videosRes] = await Promise.all([
                api.get(`/api/courses/${courseId}`),
                api.get(`/api/courses/${courseId}/videos`)
            ])

            const courseData = courseRes.data
            const videosData = videosRes.data.videos || []

            setCourse({ ...courseData, videos: videosData })
        } catch (error) {
            console.error('Failed to fetch course:', error)
        } finally {
            setLoading(false)
        }
    }

    const checkAccess = async () => {
        try {
            const token = localStorage.getItem('access_token')
            if (!token) return

            const response = await api.get(`/api/payments/check-access/${courseId}`)
            setHasAccess(response.data.has_access)
        } catch (error) {
            console.error('Failed to check access:', error)
        }
    }

    if (loading) {
        return (
            <>
                <Header />
                <main className="min-h-screen bg-black pt-24 pb-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="animate-pulse">
                            <div className="h-96 bg-gray-800 rounded-xl mb-8"></div>
                            <div className="h-10 bg-gray-800 rounded w-3/4 mb-4"></div>
                            <div className="h-6 bg-gray-800 rounded w-1/2"></div>
                        </div>
                    </div>
                </main>
            </>
        )
    }

    if (!course) {
        return (
            <>
                <Header />
                <main className="min-h-screen bg-black pt-24 pb-12 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-4">Хичээл олдсонгүй</h1>
                        <Button href="/courses">Буцах</Button>
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
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            {/* Thumbnail */}
                            <div className="relative w-full h-96 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl mb-8 overflow-hidden">
                                {course.thumbnail ? (
                                    <img
                                        src={course.thumbnail}
                                        alt={course.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <svg className="w-32 h-32 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                )}
                            </div>

                            {/* Title & Category */}
                            <div className="mb-6">
                                {course.category && (
                                    <span className="inline-block px-3 py-1 bg-gray-800 text-accent text-sm font-semibold rounded-full mb-3">
                                        {course.category}
                                    </span>
                                )}
                                <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
                            </div>

                            {/* Description */}
                            <Card className="mb-8">
                                <h2 className="text-2xl font-semibold mb-4">Тайлбар</h2>
                                <p className="text-gray-400 whitespace-pre-line">
                                    {course.description || 'Тайлбар байхгүй'}
                                </p>
                            </Card>

                            {/* Videos List */}
                            {course.videos && course.videos.length > 0 && (
                                <Card>
                                    <h2 className="text-2xl font-semibold mb-6">
                                        Хичээлийн агуулга ({course.videos.length} видео)
                                    </h2>

                                    <div className="space-y-3">
                                        {course.videos.map((video: any, index: number) => (
                                            <div
                                                key={video.id}
                                                onClick={() => router.push(`/watch/${course.id}?videoId=${video.id}`)}
                                                className="flex items-center justify-between p-4 bg-gray-900 rounded-lg hover:bg-gray-800 transition-all cursor-pointer"
                                            >
                                                <div className="flex items-center space-x-4">
                                                    <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center font-semibold">
                                                        {index + 1}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold">{video.title}</h3>
                                                        {video.duration && (
                                                            <p className="text-sm text-gray-500">
                                                                {Math.floor(video.duration / 60)} мин
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>

                                                {video.is_preview ? (
                                                    <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full">
                                                        Preview
                                                    </span>
                                                ) : !hasAccess && (
                                                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                    </svg>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <Card className="sticky top-24">
                                {/* Price */}
                                <div className="mb-6">
                                    {course.is_free ? (
                                        <div className="text-4xl font-bold text-green-400">ҮНЭГҮЙ</div>
                                    ) : (
                                        <div className="text-4xl font-bold text-accent">
                                            {course.price?.toLocaleString()}₮
                                        </div>
                                    )}
                                </div>

                                {/* CTA Button */}
                                {hasAccess ? (
                                    <Button href={`/watch/${course.id}`} variant="primary" className="w-full mb-4">
                                        Үзэж эхлэх
                                    </Button>
                                ) : course.is_free ? (
                                    <Button href={`/watch/${course.id}`} variant="primary" className="w-full mb-4">
                                        Үнэгүй үзэх
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={() => {
                                            const token = localStorage.getItem('access_token')
                                            if (!token) {
                                                router.push('/login')
                                            } else {
                                                setShowPaymentModal(true)
                                            }
                                        }}
                                        variant="primary"
                                        className="w-full mb-4"
                                    >
                                        Худалдаж авах
                                    </Button>
                                )}

                                {/* Features */}
                                <div className="space-y-3 text-sm text-gray-400 border-t border-gray-700 pt-6">
                                    <div className="flex items-center space-x-3">
                                        <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                        <span>{course.videos?.length || 0} видео хичээл</span>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>Насан туршдаа хандах</span>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                        </svg>
                                        <span>Гар утас, компьютер дээр үзэх</span>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />

            {/* Payment Modal */}
            <PaymentModal
                isOpen={showPaymentModal}
                onClose={() => setShowPaymentModal(false)}
                courseId={courseId}
                courseTitle={course.title}
                price={course.price || 0}
            />
        </>
    )
}
