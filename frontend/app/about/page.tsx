'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function AboutPage() {
    const [stats, setStats] = useState({
        students: 0,
        courses: 0,
        instructors: 0,
        completionRate: 0
    })

    // Animated counter effect
    useEffect(() => {
        const targetStats = {
            students: 15000,
            courses: 200,
            instructors: 50,
            completionRate: 92
        }

        const duration = 2000 // 2 seconds
        const steps = 60
        const interval = duration / steps

        let currentStep = 0
        const timer = setInterval(() => {
            currentStep++
            const progress = currentStep / steps

            setStats({
                students: Math.floor(targetStats.students * progress),
                courses: Math.floor(targetStats.courses * progress),
                instructors: Math.floor(targetStats.instructors * progress),
                completionRate: Math.floor(targetStats.completionRate * progress)
            })

            if (currentStep >= steps) {
                clearInterval(timer)
                setStats(targetStats)
            }
        }, interval)

        return () => clearInterval(timer)
    }, [])

    const team = [
        {
            name: 'М. Жавхлантөгс',
            role: 'Хөгжүүлэгч',
            bio: 'MonDev.mn платформыг бүхэлд нь хөгжүүлсэн. Full-stack хөгжүүлэлтийн мэргэжилтэн.',
            image: '👨‍💻'
        }
    ]

    const milestones = [
        { year: '2025-12-01', title: 'Хөгжүүлэлт эхлэв', description: 'MonDev.mn хөгжүүлэлт албан ёсоор эхэллээ' },
        { year: '2025-12-07', title: 'Ажиллогаанд орно', description: 'Вэб сайт бүрэн ажиллагаанд орно' }
    ]


    const technologies = [
        { name: 'Next.js', icon: '⚛️', description: 'Modern React framework' },
        { name: 'Python', icon: '🐍', description: 'Backend API' },
        { name: 'PostgreSQL', icon: '🐘', description: 'Database' },
        { name: 'AWS', icon: '☁️', description: 'Cloud infrastructure' }
    ]

    return (
        <>
            <Header />

            <main className="min-h-screen bg-black pt-24 pb-12">
                {/* Hero Section */}
                <section className="px-4 mb-20">
                    <div className="max-w-7xl mx-auto text-center">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
                                Бидний тухай
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
                            MonDev.mn нь Монголын хамгийн том онлайн сургалтын платформ юм.
                            Бид мэргэжлийн өндөр түвшний хичээлүүдээр дамжуулан Монголын залуучуудын ирээдүйг бүтээж байна.
                        </p>
                    </div>
                </section>

                {/* Mission & Vision */}
                <section className="px-4 mb-20">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Mission */}
                            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-700">
                                <div className="text-5xl mb-4">🎯</div>
                                <h2 className="text-3xl font-bold text-white mb-4">Эрхэм зорилго</h2>
                                <p className="text-gray-400 leading-relaxed">
                                    Монголын залуучуудад дэлхийн стандартад нийцсэн мэргэжлийн боловсрол олгох,
                                    тэдний ирээдүйг бүтээхэд нь туслах. Бид хүн бүрт чанартай боловсрол авах
                                    боломжийг олгохыг эрхэмлэдэг.
                                </p>
                            </div>

                            {/* Vision */}
                            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-700">
                                <div className="text-5xl mb-4">🚀</div>
                                <h2 className="text-3xl font-bold text-white mb-4">Алсын хараа</h2>
                                <p className="text-gray-400 leading-relaxed">
                                    Монгол улсын хамгийн том, хамгийн итгэлтэй онлайн сургалтын платформ болох.
                                    Мянга мянган хүмүүсийн амьдралыг өөрчлөх, тэдний мэргэжлийн ур чадварыг
                                    дээшлүүлэхэд хувь нэмэр оруулах.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats */}
                <section className="px-4 mb-20">
                    <div className="max-w-7xl mx-auto">
                        <div className="bg-gradient-to-r from-accent/10 to-blue-600/10 rounded-2xl p-12 border border-accent/20">
                            <h2 className="text-3xl font-bold text-center text-white mb-12">
                                Бидний амжилт тоогоор
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                <div className="text-center">
                                    <div className="text-5xl font-bold text-accent mb-2">
                                        {stats.students.toLocaleString()}+
                                    </div>
                                    <div className="text-gray-400">Суралцагчид</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-5xl font-bold text-accent mb-2">
                                        {stats.courses}+
                                    </div>
                                    <div className="text-gray-400">Хичээлүүд</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-5xl font-bold text-accent mb-2">
                                        {stats.instructors}+
                                    </div>
                                    <div className="text-gray-400">Багш нар</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-5xl font-bold text-accent mb-2">
                                        {stats.completionRate}%
                                    </div>
                                    <div className="text-gray-400">Дуусгалтын хувь</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Team */}
                <section className="px-4 mb-20">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-4xl font-bold text-center text-white mb-4">
                            Манай баг
                        </h2>
                        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
                            Бид Монголын tech салбарыг хөгжүүлэх хүсэл эрмэлзэлтэй, туршлагатай мэргэжилтнүүдийн баг юм
                        </p>

                        <div className="grid md:grid-cols-3 gap-8">
                            {team.map((member, index) => (
                                <div
                                    key={index}
                                    className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 border border-gray-700 text-center hover:border-accent transition-all duration-300 hover:shadow-xl hover:shadow-accent/20"
                                >
                                    <div className="text-6xl mb-4">{member.image}</div>
                                    <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                                    <div className="text-accent text-sm font-semibold mb-4">{member.role}</div>
                                    <p className="text-gray-400 text-sm leading-relaxed">{member.bio}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Timeline */}
                <section className="px-4 mb-20">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl font-bold text-center text-white mb-12">
                            Бидний аялал
                        </h2>

                        <div className="space-y-8">
                            {milestones.map((milestone, index) => (
                                <div
                                    key={index}
                                    className="flex items-start space-x-6 group"
                                >
                                    <div className="flex-shrink-0">
                                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-blue-600 flex items-center justify-center text-white font-bold border-4 border-gray-900 group-hover:scale-110 transition-transform">
                                            {index + 1}
                                        </div>
                                    </div>
                                    <div className="flex-1 bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-700 group-hover:border-accent transition-colors">
                                        <div className="text-accent font-bold mb-2">{milestone.year}</div>
                                        <h3 className="text-xl font-bold text-white mb-2">{milestone.title}</h3>
                                        <p className="text-gray-400">{milestone.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Technology Stack */}
                <section className="px-4 mb-20">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-4xl font-bold text-center text-white mb-4">
                            Технологи
                        </h2>
                        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
                            Бид хамгийн сүүлийн үеийн технологиудыг ашиглан найдвартай, хурдан платформ бүтээсэн
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {technologies.map((tech, index) => (
                                <div
                                    key={index}
                                    className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-700 text-center hover:border-accent transition-all duration-300 hover:shadow-xl hover:shadow-accent/20 group"
                                >
                                    <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">
                                        {tech.icon}
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2">{tech.name}</h3>
                                    <p className="text-sm text-gray-400">{tech.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-gradient-to-r from-accent to-blue-600 rounded-2xl p-12 text-center">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Бидэнтэй нэгдээрэй
                            </h2>
                            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                                Өөрийн ирээдүйг өөрчлөх эхлэлийг өнөөдөр хий. Мянга мянган хүмүүс аль хэдийн эхэлсэн.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/register"
                                    className="inline-block px-8 py-4 bg-white text-accent rounded-lg font-bold hover:bg-gray-100 transition-colors"
                                >
                                    Бүртгүүлэх
                                </Link>
                                <Link
                                    href="/courses"
                                    className="inline-block px-8 py-4 bg-white/10 text-white rounded-lg font-bold hover:bg-white/20 transition-colors border-2 border-white"
                                >
                                    Хичээл үзэх
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    )
}
