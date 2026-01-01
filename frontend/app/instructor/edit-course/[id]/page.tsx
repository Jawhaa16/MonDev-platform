'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import api from '@/lib/api'
import ConfirmModal from '@/components/ui/ConfirmModal'
import AddVideoModal from '@/components/ui/AddVideoModal'
import { uploadImage, validateImageFile } from '@/lib/upload'
import { useRef } from 'react'

import { toast } from 'react-hot-toast'

export default function EditCoursePage({ params }: { params: { id: string } }) {
    const router = useRouter()
    const [course, setCourse] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [videos, setVideos] = useState<any[]>([])
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isAddVideoModalOpen, setIsAddVideoModalOpen] = useState(false)
    const thumbnailInputRef = useRef<HTMLInputElement>(null)

    // Form state
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        category: '',
        is_free: false,
        is_published: false,
        thumbnail_url: ''
    })

    useEffect(() => {
        fetchCourse()
        fetchVideos()
    }, [])

    const fetchCourse = async () => {
        try {
            const response = await api.get(`/api/courses/${params.id}`)
            const courseData = response.data
            setCourse(courseData)
            setFormData({
                title: courseData.title,
                description: courseData.description,
                price: courseData.price?.toString() || '',
                category: courseData.category,
                is_free: courseData.is_free,
                is_published: courseData.is_published,
                thumbnail_url: courseData.thumbnail_url || ''
            })
        } catch (error) {
            console.error('Failed to fetch course:', error)
            toast.error('Хичээлийн мэдээлэл авахад алдаа гарлаа')
        } finally {
            setLoading(false)
        }
    }

    const fetchVideos = async () => {
        try {
            const response = await api.get(`/api/courses/${params.id}/videos`)
            setVideos(response.data.videos || [])
        } catch (error) {
            console.error('Failed to fetch videos:', error)
        }
    }

    const handleAddVideo = async (videoData: any) => {
        try {
            await api.post('/api/videos', {
                ...videoData,
                course_id: params.id
            })
            await fetchVideos()
            toast.success('Видео амжилттай нэмэгдлээ')
        } catch (error) {
            console.error('Failed to add video:', error)
            toast.error('Видео нэмэхэд алдаа гарлаа')
            throw error
        }
    }

    const handleDeleteVideo = async (videoId: string) => {
        if (!confirm('Та энэ видеог устгахдаа итгэлтэй байна уу?')) return

        try {
            await api.delete(`/api/videos/${videoId}`)
            await fetchVideos()
            toast.success('Видео устгагдлаа')
        } catch (error) {
            console.error('Failed to delete video:', error)
            toast.error('Видео устгахад алдаа гарлаа')
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)

        try {
            await api.put(`/api/courses/${params.id}`, {
                ...formData,
                price: formData.is_free ? 0 : parseFloat(formData.price)
            })
            toast.success('Хичээлийн мэдээлэл шинэчлэгдлээ')
        } catch (error) {
            console.error('Failed to update course:', error)
            toast.error('Хичээл шинэчлэхэд алдаа гарлаа')
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async () => {
        try {
            await api.delete(`/api/courses/${params.id}`)
            toast.success('Хичээл устгагдлаа')
            router.push('/instructor')
        } catch (error) {
            console.error('Failed to delete course:', error)
            toast.error('Хичээл устгахад алдаа гарлаа')
        }
    }

    const handleThumbnailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const validation = validateImageFile(file)
        if (!validation.valid) {
            toast.error(validation.error || 'Буруу файл')
            return
        }

        try {
            const result = await uploadImage(file)
            setFormData({ ...formData, thumbnail_url: result.url })
            toast.success('Зураг амжилттай хуулагдлаа')
        } catch (error: any) {
            console.error('Failed to upload thumbnail:', error)
            const errorMessage = error.response?.data?.detail || error.message || 'Thumbnail upload хийхэд алдаа гарлаа'
            toast.error(errorMessage)
        }
    }

    if (loading) {
        return <div className="min-h-screen bg-black flex items-center justify-center text-white">Уншиж байна...</div>
    }

    return (
        <>
            <Header />
            <ConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
                title="Хичээл устгах"
                message="Та энэ хичээлийг устгахдаа итгэлтэй байна уу? Энэ үйлдлийг буцаах боломжгүй."
                confirmText="Устгах"
                isDanger={true}
            />
            <AddVideoModal
                isOpen={isAddVideoModalOpen}
                onClose={() => setIsAddVideoModalOpen(false)}
                onSubmit={handleAddVideo}
                nextOrderIndex={videos.length}
            />
            <main className="min-h-screen bg-black pt-24 pb-12">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-3xl font-bold">Хичээл засах</h1>
                        <div className="flex gap-4">
                            <Button
                                onClick={() => router.push('/instructor')}
                                variant="outline"
                            >
                                Буцах
                            </Button>
                            <Button
                                onClick={() => setIsDeleteModalOpen(true)}
                                className="bg-red-600 hover:bg-red-700 text-white"
                            >
                                Устгах
                            </Button>
                        </div>
                    </div>

                    <div className="grid gap-8">
                        {/* Course Info */}
                        <Card>
                            <h2 className="text-xl font-semibold mb-6">Үндсэн мэдээлэл</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <Input
                                    label="Хичээлийн нэр"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">
                                        Тайлбар
                                    </label>
                                    <textarea
                                        className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-white h-32"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        required
                                    />
                                </div>

                                {/* Thumbnail Upload */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">
                                        Хичээлийн зураг (Заавал биш)
                                    </label>
                                    <input
                                        ref={thumbnailInputRef}
                                        type="file"
                                        accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                                        onChange={handleThumbnailChange}
                                        className="hidden"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => thumbnailInputRef.current?.click()}
                                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white hover:bg-gray-700 transition-colors"
                                    >
                                        {formData.thumbnail_url ? 'Зураг солих' : 'Зураг сонгох'}
                                    </button>
                                    {formData.thumbnail_url && (
                                        <div className="mt-4">
                                            <img
                                                src={formData.thumbnail_url}
                                                alt="Course thumbnail"
                                                className="w-full h-48 object-cover rounded-lg border border-gray-700"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">
                                            Ангилал
                                        </label>
                                        <select
                                            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-white"
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        >
                                            <option value="Programming">Programming</option>
                                            <option value="Design">Design</option>
                                            <option value="Business">Business</option>
                                            <option value="Marketing">Marketing</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">
                                            Төлбөр
                                        </label>
                                        <div className="flex gap-4 mb-4">
                                            <button
                                                type="button"
                                                className={`flex-1 py-2 rounded-lg border ${formData.is_free ? 'bg-accent border-accent text-white' : 'border-gray-700 text-gray-400'}`}
                                                onClick={() => setFormData({ ...formData, is_free: true })}
                                            >
                                                Үнэгүй
                                            </button>
                                            <button
                                                type="button"
                                                className={`flex-1 py-2 rounded-lg border ${!formData.is_free ? 'bg-accent border-accent text-white' : 'border-gray-700 text-gray-400'}`}
                                                onClick={() => setFormData({ ...formData, is_free: false })}
                                            >
                                                Төлбөртэй
                                            </button>
                                        </div>
                                        {!formData.is_free && (
                                            <Input
                                                type="number"
                                                placeholder="Үнэ (₮)"
                                                value={formData.price}
                                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                            />
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 pt-4 border-t border-gray-800">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.is_published}
                                            onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                                            className="w-5 h-5 rounded border-gray-700 bg-gray-900 text-accent focus:ring-accent"
                                        />
                                        <span className="text-white">Нийтлэх (Олон нийтэд харагдана)</span>
                                    </label>
                                </div>

                                <div className="flex justify-end">
                                    <Button type="submit" disabled={saving} variant="primary">
                                        {saving ? 'Хадгалж байна...' : 'Хадгалах'}
                                    </Button>
                                </div>
                            </form>
                        </Card>

                        {/* Videos Section */}
                        <Card>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold">Видео хичээлүүд</h2>
                                <Button
                                    onClick={() => setIsAddVideoModalOpen(true)}
                                    variant="secondary"
                                >
                                    + Видео нэмэх
                                </Button>
                            </div>

                            {videos.length === 0 ? (
                                <div className="text-center py-8 text-gray-500">
                                    Одоогоор видео байхгүй байна
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {videos.map((video, index) => (
                                        <div key={video.id} className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                                            <div className="flex items-center gap-4">
                                                <div className="w-8 h-8 flex items-center justify-center bg-gray-800 rounded-full text-sm font-bold">
                                                    {index + 1}
                                                </div>
                                                <div>
                                                    <h3 className="font-medium">{video.title}</h3>
                                                    <p className="text-sm text-gray-400">{video.duration} мин</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleDeleteVideo(video.id)}
                                                    className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
                                                >
                                                    Устгах
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </Card>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
