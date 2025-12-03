'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import api from '@/lib/api'

export default function CreateCoursePage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        is_free: true,
        price: ''
    })

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

            alert('Хичээл амжилттай үүслээ!')
            router.push(`/instructor`)
        } catch (error: any) {
            console.error('Failed to create course:', error)
            if (error.response) {
                console.error('Error data:', error.response.data)
                alert(`Алдаа: ${error.response.data.detail || 'Хичээл үүсгэхэд алдаа гарлаа'}`)
            } else if (error.request) {
                console.error('Error request:', error.request)
                alert('Сэрвэртэй холбогдож чадсангүй. Та интернет холболтоо шалгана уу.')
            } else {
                console.error('Error message:', error.message)
                alert(`Алдаа: ${error.message}`)
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
                                    placeholder="Хичээлийн тухай дэлгэрэнгүй мэдээлэл..."
                                    rows={6}
                                    required
                                    className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all resize-none"
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Ангилал
                                </label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-accent"
                                >
                                    <option value="">Сонгох...</option>
                                    <option value="Programming">Programming</option>
                                    <option value="Design">Design</option>
                                    <option value="Business">Business</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Data Science">Data Science</option>
                                </select>
                            </div>

                            {/* Price Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-3">
                                    Төлбөр <span className="text-accent">*</span>
                                </label>

                                <div className="flex gap-4 mb-4">
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, is_free: true, price: '' })}
                                        className={`flex-1 px-6 py-3 rounded-lg border-2 transition-all ${formData.is_free
                                            ? 'border-accent bg-accent/10 text-white'
                                            : 'border-gray-700 bg-gray-800 text-gray-400 hover:border-gray-600'
                                            }`}
                                    >
                                        Үнэгүй
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, is_free: false })}
                                        className={`flex-1 px-6 py-3 rounded-lg border-2 transition-all ${!formData.is_free
                                            ? 'border-accent bg-accent/10 text-white'
                                            : 'border-gray-700 bg-gray-800 text-gray-400 hover:border-gray-600'
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
                                        required={!formData.is_free}
                                    />
                                )}
                            </div>

                            {/* Info Box */}
                            <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                                <div className="flex items-start space-x-3">
                                    <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div className="text-sm text-gray-300">
                                        Хичээл үүссэний дараа видео нэмж, нийтлэх боломжтой болно.
                                    </div>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-4">
                                <Button
                                    type="button"
                                    onClick={() => router.back()}
                                    variant="secondary"
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
