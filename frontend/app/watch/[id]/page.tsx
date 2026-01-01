'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Card from '@/components/ui/Card'
import api from '@/lib/api'

import { toast } from 'react-hot-toast'

export default function VideoPlayerPage() {
    const params = useParams()
    const router = useRouter()
    const courseId = params.id as string

    const [course, setCourse] = useState<any>(null)
    const [currentVideo, setCurrentVideo] = useState<any>(null)
    const [hasAccess, setHasAccess] = useState(false)
    const [loading, setLoading] = useState(true)
    const [likeCount, setLikeCount] = useState(0)
    const [isLiked, setIsLiked] = useState(false)

    const searchParams = useSearchParams()
    const videoIdParam = searchParams.get('videoId')

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

            // Set initial video
            if (videosData.length > 0) {
                const targetVideoId = videoIdParam && videosData.find((v: any) => v.id === videoIdParam)
                    ? videoIdParam
                    : videosData[0].id

                fetchVideoDetails(targetVideoId)
            }
        } catch (error) {
            console.error('Failed to fetch course data:', error)
            toast.error('Хичээлийн мэдээлэл авахад алдаа гарлаа')
        } finally {
            setLoading(false)
        }
    }

    const fetchVideoDetails = async (videoId: string) => {
        try {
            const response = await api.get(`/api/videos/${videoId}`)
            const videoData = response.data
            setCurrentVideo(videoData)
            setLikeCount(videoData.like_count || 0)
            setIsLiked(videoData.is_liked || false)
        } catch (error) {
            console.error('Failed to fetch video details:', error)
        }
    }

    const checkAccess = async () => {
        try {
            const response = await api.get(`/api/payments/check-access/${courseId}`)
            setHasAccess(response.data.has_access)
        } catch (error) {
            console.error('Failed to check access:', error)
            setHasAccess(false)
        }
    }

    const handleVideoSelect = (video: any) => {
        if (video.is_preview || hasAccess) {
            fetchVideoDetails(video.id)
        } else {
            toast.error('Энэ видеог үзэхийн тулд хичээлийг худалдаж авна уу')
        }
    }

    const handleLike = async () => {
        if (!currentVideo) return

        try {
            if (isLiked) {
                await api.delete(`/api/videos/${currentVideo.id}/unlike`)
                setLikeCount(prev => Math.max(0, prev - 1))
                setIsLiked(false)
            } else {
                await api.post(`/api/videos/${currentVideo.id}/like`)
                setLikeCount(prev => prev + 1)
                setIsLiked(true)
            }
        } catch (error) {
            console.error('Failed to toggle like:', error)
            toast.error('Үйлдэл амжилтгүй боллоо')
        }
    }

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href)
        toast.success('Линк хуулагдлаа')
    }

    const getYouTubeEmbedUrl = (url: string) => {
        if (!url) return null
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
        const match = url.match(regExp)
        return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null
    }

    if (loading) {
        return (
            <>
                <Header />
                <main className="min-h-screen bg-black pt-24 pb-12">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="animate-pulse">
                            <div className="h-96 bg-gray-800 rounded-xl mb-8"></div>
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
                        <button
                            onClick={() => router.push('/courses')}
                            className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Хичээлүүд рүү буцах
                        </button>
                    </div>
                </main>
            </>
        )
    }

    const youtubeEmbedUrl = currentVideo ? getYouTubeEmbedUrl(currentVideo.video_url) : null

    return (
        <>
            <Header />

            <main className="min-h-screen bg-black pt-20 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Video Player */}
                        <div className="lg:col-span-2">
                            <Card padding="sm" className="mb-6">
                                {/* Video Container */}
                                <div className="relative w-full overflow-hidden rounded-lg bg-gray-900" style={{ paddingTop: '56.25%' }}>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        {currentVideo?.video_url ? (
                                            youtubeEmbedUrl ? (
                                                <iframe
                                                    className="w-full h-full"
                                                    src={youtubeEmbedUrl}
                                                    title={currentVideo.title}
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                ></iframe>
                                            ) : (
                                                <video
                                                    controls
                                                    className="w-full h-full"
                                                    src={currentVideo.video_url}
                                                    poster={currentVideo.thumbnail_url}
                                                >
                                                    Таны browser видео тоглуулагчийг дэмжихгүй байна.
                                                </video>
                                            )
                                        ) : (
                                            <div className="text-center">
                                                <svg className="w-20 h-20 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <p className="text-gray-400">Видео сонгоно уу</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Card>

                            {/* Video Info */}
                            <Card>
                                <h1 className="text-2xl font-bold mb-2">{currentVideo?.title || course.title}</h1>
                                <p className="text-gray-400 mb-4">{currentVideo?.description || course.description}</p>

                                {/* Actions */}
                                <div className="flex items-center gap-4 pt-4 border-t border-gray-700">
                                    <button
                                        onClick={handleLike}
                                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${isLiked ? 'bg-accent text-white' : 'bg-gray-800 hover:bg-gray-700'
                                            }`}
                                    >
                                        <svg className="w-5 h-5" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                        <span>Like {likeCount > 0 && `(${likeCount})`}</span>
                                    </button>

                                    <button
                                        onClick={handleShare}
                                        className="flex items-center space-x-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                        </svg>
                                        <span>Хуваалцах</span>
                                    </button>
                                </div>
                            </Card>
                        </div>

                        {/* Playlist */}
                        <div className="lg:col-span-1">
                            <Card>
                                <h2 className="text-xl font-semibold mb-4">
                                    Плэйлист ({course.videos?.length || 0})
                                </h2>

                                <div className="space-y-2 max-h-[600px] overflow-y-auto">
                                    {course.videos?.map((video: any, index: number) => (
                                        <button
                                            key={video.id}
                                            onClick={() => handleVideoSelect(video)}
                                            className={`w-full text-left p-3 rounded-lg transition-all ${currentVideo?.id === video.id
                                                ? 'bg-accent text-white'
                                                : 'bg-gray-800 hover:bg-gray-700'
                                                }`}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <div className={`w-8 h-8 rounded flex items-center justify-center font-semibold text-sm ${currentVideo?.id === video.id ? 'bg-white/20' : 'bg-gray-700'
                                                    }`}>
                                                    {index + 1}
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <div className="font-medium truncate">{video.title}</div>
                                                    {video.duration && (
                                                        <div className="text-xs text-gray-400">
                                                            {Math.floor(video.duration / 60)} мин
                                                        </div>
                                                    )}
                                                </div>

                                                {video.is_preview && (
                                                    <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">
                                                        Preview
                                                    </span>
                                                )}

                                                {!video.is_preview && !hasAccess && (
                                                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                    </svg>
                                                )}
                                            </div>
                                        </button>
                                    ))}
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
