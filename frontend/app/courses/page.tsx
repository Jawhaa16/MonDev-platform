'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CourseCard from '@/components/course/CourseCard'
import SearchBar from '@/components/course/SearchBar'
import api from '@/lib/api'

export default function CoursesPage() {
    const [courses, setCourses] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const [priceFilter, setPriceFilter] = useState<'all' | 'free' | 'paid'>('all')
    const [sortBy, setSortBy] = useState('created_at')

    const categories = ['Programming', 'Design', 'Business', 'Marketing', 'Data Science']

    useEffect(() => {
        fetchCourses()
    }, [searchQuery, selectedCategory, priceFilter, sortBy])

    const fetchCourses = async () => {
        try {
            setLoading(true)

            const params: any = {
                page: 1,
                page_size: 20,
                sort_by: sortBy
            }

            if (searchQuery) params.q = searchQuery
            if (selectedCategory) params.category = selectedCategory
            if (priceFilter === 'free') params.is_free = true
            if (priceFilter === 'paid') params.is_free = false

            const response = await api.get('/api/search', { params })
            setCourses(response.data.courses)
        } catch (error) {
            console.error('Failed to fetch courses:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Header />

            <main className="min-h-screen bg-black pt-24 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Hero Section */}
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-bold mb-4">Хичээлүүд</h1>
                        <p className="text-xl text-gray-400">
                            Мэргэжилтнүүдээс суралцаж, мэдлэгээ дээшлүүлээрэй
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="mb-8">
                        <SearchBar onSearch={setSearchQuery} />
                    </div>

                    {/* Filters */}
                    <div className="mb-8 flex flex-wrap gap-4">
                        {/* Category Filter */}
                        <div>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-accent"
                            >
                                <option value="">Бүх ангилал</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        {/* Price Filter */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => setPriceFilter('all')}
                                className={`px-4 py-2 rounded-lg transition-all ${priceFilter === 'all'
                                    ? 'bg-accent text-white'
                                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                    }`}
                            >
                                Бүгд
                            </button>
                            <button
                                onClick={() => setPriceFilter('free')}
                                className={`px-4 py-2 rounded-lg transition-all ${priceFilter === 'free'
                                    ? 'bg-accent text-white'
                                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                    }`}
                            >
                                Үнэгүй
                            </button>
                            <button
                                onClick={() => setPriceFilter('paid')}
                                className={`px-4 py-2 rounded-lg transition-all ${priceFilter === 'paid'
                                    ? 'bg-accent text-white'
                                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                    }`}
                            >
                                Төлбөртэй
                            </button>
                        </div>

                        {/* Sort */}
                        <div className="ml-auto">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-accent"
                            >
                                <option value="created_at">Шинэ эхэндэ</option>
                                <option value="price_asc">Үнэ: Бага → Их</option>
                                <option value="price_desc">Үнэ: Их → Бага</option>
                                <option value="title">Нэрээр</option>
                            </select>
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="mb-6 text-gray-400">
                        {loading ? 'Уншиж байна...' : `${courses.length} хичээл олдлоо`}
                    </div>

                    {/* Courses Grid */}
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="h-96 bg-gray-800 rounded-xl animate-pulse" />
                            ))}
                        </div>
                    ) : courses.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {courses.map((course) => (
                                <CourseCard
                                    key={course.id}
                                    id={course.id}
                                    title={course.title}
                                    description={course.description}
                                    thumbnail={course.thumbnail_url}
                                    instructor_name={course.instructor_name}
                                    instructor_avatar={course.instructor_avatar}
                                    price={course.price}
                                    is_free={course.is_free}
                                    category={course.category}
                                    video_count={course.video_count}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <svg className="w-20 h-20 text-gray-700 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-xl text-gray-500">Хичээл олдсонгүй</p>
                            <p className="text-gray-600 mt-2">Өөр filter ашиглаж үзээрэй</p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </>
    )
}
