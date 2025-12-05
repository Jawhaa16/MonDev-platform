import React, { useState, useRef } from 'react'
import Input from './Input'
import Button from './Button'
import { uploadImage, uploadVideo, validateImageFile, validateVideoFile } from '@/lib/upload'

interface AddVideoModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (videoData: {
        title: string
        description: string
        video_url: string
        thumbnail_url?: string
        duration: number
        order_index: number
    }) => Promise<void>
    nextOrderIndex: number
}

export default function AddVideoModal({
    isOpen,
    onClose,
    onSubmit,
    nextOrderIndex
}: AddVideoModalProps) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        video_url: '',
        thumbnail_url: '',
        duration: 0
    })
    const [submitting, setSubmitting] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [uploading, setUploading] = useState(false)
    const [useFileUpload, setUseFileUpload] = useState(false)

    const videoInputRef = useRef<HTMLInputElement>(null)
    const thumbnailInputRef = useRef<HTMLInputElement>(null)

    if (!isOpen) return null

    const handleVideoFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const validation = validateVideoFile(file)
        if (!validation.valid) {
            alert(validation.error)
            return
        }

        setUploading(true)
        setUploadProgress(0)

        try {
            const result = await uploadVideo(file, (progress) => {
                setUploadProgress(progress)
            })
            setFormData({ ...formData, video_url: `http://localhost:8000${result.url}` })
        } catch (error: any) {
            console.error('Failed to upload video:', error)
            const errorMessage = error.response?.data?.detail || error.message || 'Видео upload хийхэд алдаа гарлаа'
            alert(errorMessage)
        } finally {
            setUploading(false)
            setUploadProgress(0)
        }
    }

    const handleThumbnailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const validation = validateImageFile(file)
        if (!validation.valid) {
            alert(validation.error)
            return
        }

        try {
            const result = await uploadImage(file)
            setFormData({ ...formData, thumbnail_url: `http://localhost:8000${result.url}` })
        } catch (error: any) {
            console.error('Failed to upload thumbnail:', error)
            const errorMessage = error.response?.data?.detail || error.message || 'Thumbnail upload хийхэд алдаа гарлаа'
            alert(errorMessage)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)

        try {
            await onSubmit({
                ...formData,
                order_index: nextOrderIndex
            })

            // Reset form
            setFormData({
                title: '',
                description: '',
                video_url: '',
                thumbnail_url: '',
                duration: 0
            })
            setUseFileUpload(false)
            onClose()
        } catch (error) {
            console.error('Failed to add video:', error)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-gray-900 rounded-xl border border-gray-800 max-w-2xl w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-white">Видео нэмэх</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label="Видеоны гарчиг"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                    />

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                            Тайлбар
                        </label>
                        <textarea
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-white h-24"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    {/* Toggle between URL and File Upload */}
                    <div className="flex gap-2 p-1 bg-gray-800 rounded-lg">
                        <button
                            type="button"
                            onClick={() => setUseFileUpload(false)}
                            className={`flex-1 py-2 rounded transition-colors ${!useFileUpload ? 'bg-accent text-white' : 'text-gray-400'}`}
                        >
                            Холбоос (URL)
                        </button>
                        <button
                            type="button"
                            onClick={() => setUseFileUpload(true)}
                            className={`flex-1 py-2 rounded transition-colors ${useFileUpload ? 'bg-accent text-white' : 'text-gray-400'}`}
                        >
                            Файл Upload
                        </button>
                    </div>

                    {!useFileUpload ? (
                        <Input
                            label="Видеоны холбоос (URL)"
                            type="url"
                            value={formData.video_url}
                            onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                            placeholder="https://youtube.com/watch?v=... эсвэл бусад"
                            required
                            helperText="YouTube, Vimeo эсвэл өөр видео платформын холбоос оруулна уу"
                        />
                    ) : (
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                                Видео файл оруулах
                            </label>
                            <input
                                ref={videoInputRef}
                                type="file"
                                accept="video/mp4,video/webm,video/quicktime,video/x-msvideo"
                                onChange={handleVideoFileChange}
                                className="hidden"
                            />
                            <button
                                type="button"
                                onClick={() => videoInputRef.current?.click()}
                                disabled={uploading}
                                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white hover:bg-gray-700 transition-colors disabled:opacity-50"
                            >
                                {uploading ? `Уншиж байна... ${uploadProgress}%` : formData.video_url ? 'Видео солих' : 'Видео сонгох'}
                            </button>
                            {uploading && (
                                <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
                                    <div
                                        className="bg-accent h-2 rounded-full transition-all"
                                        style={{ width: `${uploadProgress}%` }}
                                    />
                                </div>
                            )}
                            {formData.video_url && !uploading && (
                                <p className="mt-2 text-sm text-green-400">✓ Видео амжилттай оруулагдлаа</p>
                            )}
                        </div>
                    )}

                    {/* Thumbnail Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                            Thumbnail (Заавал биш)
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
                            {formData.thumbnail_url ? 'Thumbnail солих' : 'Thumbnail сонгох'}
                        </button>
                        {formData.thumbnail_url && (
                            <div className="mt-2">
                                <img src={formData.thumbnail_url} alt="Thumbnail" className="w-full h-32 object-cover rounded-lg" />
                            </div>
                        )}
                    </div>

                    <Input
                        label="Үргэлжлэх хугацаа (минут)"
                        type="number"
                        value={formData.duration.toString()}
                        onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 0 })}
                        min="0"
                        required
                    />

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-800">
                        <Button
                            type="button"
                            onClick={onClose}
                            variant="outline"
                        >
                            Цуцлах
                        </Button>
                        <Button
                            type="submit"
                            disabled={submitting || uploading}
                            variant="primary"
                        >
                            {submitting ? 'Нэмж байна...' : 'Нэмэх'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
