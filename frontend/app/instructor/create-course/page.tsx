'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import api from '@/lib/api'
import { uploadImage, validateImageFile } from '@/lib/upload'

import { toast } from 'react-hot-toast'

export default function CreateCoursePage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        is_free: true,
        price: '',
        thumbnail_url: ''
    })
    const thumbnailInputRef = useRef<HTMLInputElement>(null)

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
            setFormData({ ...formData, thumbnail_url: `http://localhost:8000${result.url}` })
            toast.success('Зураг амжилттай хуулагдлаа')
        } catch (error) {
            console.error('Failed to upload thumbnail:', error)
            toast.error('Thumbnail upload хийхэд алдаа гарлаа')
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            setLoading(true)

            const courseData = {
                ...formData,
                price: formData.is_free ? null : parseFloat(formData.price)
            }

            console.log('Sending course data:', courseData)
            const response = await api.post('/api/courses', courseData)
            console.log('Course created:', response.data)

            toast.success('Хичээл амжилттай үүслээ!')
            router.push(`/instructor`)
        } catch (error: any) {
            console.error('Failed to create course:', error)
            if (error.response) {
                console.error('Error data:', error.response.data)
                toast.error(`Алдаа: ${error.response.data.detail || 'Хичээл үүсгэхэд алдаа гарлаа'}`)
            } else if (error.request) {
                console.error('Error request:', error.request)
                toast.error('Сэрвэртэй холбогдож чадсангүй. Та интернет холболтоо шалгана уу.')
            } else {
                console.error('Error message:', error.message)
                toast.error(`Алдаа: ${error.message}`)
            }
        } finally {
            setLoading(false)
        }
    }


    return (
        <>
            <Header />

            <main className="min-h-screen bg-black pt-24 pb-12">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold mb-2">Шинэ хичээл үүсгэх</h1>
                        <p className="text-gray-400">Өөрийн мэдлэгээ хуваалцаарай</p>
                    </div>

                    <Card>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Title */}
                            <Input
                                label="Хичээлийн нэр"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Жишээ: Python програмчлалын үндэс"
                                required
                            />

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Тайлбар <span className="text-accent">*</span>
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Энэ хичээлийн тухай товч танилцуулга бичнэ үү..."
                                    required
                                    rows={5}
                                    className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Ангилал <span className="text-accent">*</span>
                                </label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    required
                                    className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                                >
                                    <option value="">Сонгоно уу</option>
                                    <option value="Programming">Programming</option>
                                    <option value="Design">Design</option>
                                    <option value="Business">Business</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Data Science">Data Science</option>
                                </select>
                            </div>

                            {/* Thumbnail Upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
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
                                <p className="mt-2 text-sm text-gray-400">
                                    Хичээлийн зургийг оруулснаар хичээл илүү анхаарал татахуйц болно
                                </p>
                            </div>

                            {/* Pricing */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-3">
                                    Төлбөр <span className="text-accent">*</span>
                                </label>

                                <div className="flex gap-4 mb-4">
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, is_free: true })}
                                        className={`flex-1 py-3 rounded-lg border-2 font-medium transition-all ${formData.is_free
                                            ? 'bg-accent border-accent text-white'
                                            : 'border-gray-700 text-gray-400 hover:border-gray-600'
                                            }`}
                                    >
                                        Үнэгүй
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, is_free: false })}
                                        className={`flex-1 py-3 rounded-lg border-2 font-medium transition-all ${!formData.is_free
                                            ? 'bg-accent border-accent text-white'
                                            : 'border-gray-700 text-gray-400 hover:border-gray-600'
                                            }`}
                                    >
                                        Төлбөртэй
                                    </button>
                                </div>

                                {!formData.is_free && (
                                    <Input
                                        label="Үнэ (₮)"
                                        type="number"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        placeholder="50000"
                                        required
                                        min="0"
                                    />
                                )}
                            </div>

                            {/* Submit Button */}
                            <div className="flex gap-4 pt-6 border-t border-gray-800">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => router.push('/instructor')}
                                    className="flex-1"
                                >
                                    Цуцлах
                                </Button>
                                <Button
                                    type="submit"
                                    variant="primary"
                                    disabled={loading}
                                    className="flex-1"
                                >
                                    {loading ? 'Үүсгэж байна...' : 'Хичээл үүсгэх'}
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            </main>

            <Footer />
        </>
    )
}
