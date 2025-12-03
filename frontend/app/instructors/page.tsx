'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import api from '@/lib/api'

export default function InstructorsPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [instructors, setInstructors] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchInstructors()
    }, [])

    const fetchInstructors = async () => {
        try {
            const response = await api.get('/api/users/instructors')
            console.log('Instructors:', response.data)
            setInstructors(response.data)
        } catch (error) {
            console.error('Failed to fetch instructors:', error)
        } finally {
            setLoading(false)
        }
    }

    const filteredInstructors = instructors
        .filter(instructor => {
            const matchesSearch =
                instructor.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                instructor.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                instructor.bio?.toLowerCase().includes(searchQuery.toLowerCase())
            return matchesSearch
        })
        .sort((a, b) => {
            // Sort by created_at descending (newest first)
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        })

    return (
        <>
            <Header />

            <main className="min-h-screen bg-black pt-24 pb-12">
                {/* Hero Section */}
                <section className="px-4 mb-16">
                    <div className="max-w-7xl mx-auto text-center">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
                                Манай багш нар
                            </span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
                            Салбартаа тэргүүлэгч мэргэжилтнүүдээс суралцаж, ур чадвараа дээшлүүлээрэй
                        </p>
                    </div>
                </section>

                {/* Search */}
                <section className="px-4 mb-12">
                    <div className="max-w-7xl mx-auto">
                        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                            <div className="relative">
                                <svg
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Багш хайх..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Instructors Grid */}
                <section className="px-4">
                    <div className="max-w-7xl mx-auto">
                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="bg-gray-800 rounded-xl h-96 animate-pulse"></div>
                                ))}
                            </div>
                        ) : filteredInstructors.length === 0 ? (
                            <div className="text-center py-16">
                                <p className="text-gray-400 text-lg">Хайлтад тохирох багш олдсонгүй</p>
                                <p className="text-gray-500 text-sm mt-2">Консолыг шалгаарай</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredInstructors.map(instructor => (
                                    <div
                                        key={instructor.id}
                                        className="group bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700 overflow-hidden hover:border-accent transition-all duration-300 hover:shadow-xl hover:shadow-accent/20"
                                    >
                                        {/* Instructor Image */}
                                        <div className="relative h-64 bg-gradient-to-br from-accent/20 to-blue-600/20 overflow-hidden">
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                {instructor.profile_image ? (
                                                    <img
                                                        src={instructor.profile_image}
                                                        alt={instructor.full_name || 'Instructor'}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-accent to-blue-600 flex items-center justify-center text-4xl font-bold text-white">
                                                        {(instructor.full_name || instructor.email)?.[0]?.toUpperCase() || 'U'}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Instructor Info */}
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold text-white mb-1">
                                                {instructor.full_name || 'Багш'}
                                            </h3>
                                            <p className="text-accent text-sm mb-3">
                                                {instructor.email}
                                            </p>
                                            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                                {instructor.bio || 'Танилцуулга байхгүй'}
                                            </p>

                                            <div className="pt-4 border-t border-gray-700">
                                                <div className="text-gray-400 text-xs">
                                                    Бүртгүүлсэн: {new Date(instructor.created_at).toLocaleDateString('mn-MN')}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="px-4 mt-20">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-gradient-to-r from-accent to-blue-600 rounded-2xl p-8 md:p-12 text-center">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Та багш болохыг хүсч байна уу?
                            </h2>
                            <p className="text-white/90 text-lg mb-8">
                                Өөрийн мэдлэг, туршлагаа хуваалцаж, олон мянган хүмүүст хүрээрэй
                            </p>
                            <Link
                                href="/register"
                                className="inline-block px-8 py-4 bg-white text-accent rounded-lg font-bold hover:bg-gray-100 transition-colors"
                            >
                                Багшаар бүртгүүлэх
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    )
}
