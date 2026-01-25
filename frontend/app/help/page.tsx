'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function HelpPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [activeCategory, setActiveCategory] = useState('all')
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

    const categories = [
        { id: 'all', name: 'Бүгд', icon: '📚' },
        { id: 'getting-started', name: 'Эхлэх', icon: '🚀' },
        { id: 'courses', name: 'Хичээл', icon: '🎓' },
        { id: 'payment', name: 'Төлбөр', icon: '💳' },
        { id: 'technical', name: 'Техникийн', icon: '⚙️' },
        { id: 'account', name: 'Бүртгэл', icon: '👤' }
    ]

    const faqs = [
        {
            category: 'getting-started',
            question: 'MonDev.mn-д хэрхэн бүртгүүлэх вэ?',
            answer: 'Нүүр хуудасны "Бүртгүүлэх" товчийг дарж, Google бүртгэлээрээ нэвтэрнэ үү. Та суралцагч эсвэл багшаар бүртгүүлж болно.'
        },
        {
            category: 'getting-started',
            question: 'Хичээл үзэхийн тулд юу хийх ёстой вэ?',
            answer: 'Эхлээд бүртгүүлж, дараа нь "Хичээлүүд" хэсэгт орж сонирхсон хичээлээ сонгоно. Төлбөртэй хичээлүүдийг худалдан авсны дараа үзэж эхэлнэ.'
        },
        {
            category: 'courses',
            question: 'Хичээл хэрхэн сонгох вэ?',
            answer: 'Хичээлүүд хуудсанд орж, категори, үнэ, түвшин зэргээр шүүж болно. Хичээл бүрийн дэлгэрэнгүй мэдээлэл, багшийн танилцуулга, сэтгэгдлүүдийг уншаарай.'
        },
        {
            category: 'courses',
            question: 'Хичээл дуусгасны дараа сертификат авах уу?',
            answer: 'Тийм, хичээлийг бүрэн дуусгаж, шалгалтанд тэнцсэн тохиолдолд та албан ёсны сертификат авна.'
        },
        {
            category: 'courses',
            question: 'Хичээлийг хэр удаан үзэж болох вэ?',
            answer: 'Худалдан авсан хичээлээ хязгааргүй хугацаанд үзэх боломжтой. Та өөрийн хурдаараа суралцаж болно.'
        },
        {
            category: 'payment',
            question: 'Ямар төлбөрийн аргууд байдаг вэ?',
            answer: 'Бид QPay, банкны шилжүүлэг, картаар төлөх боломжийг санал болгодог. Төлбөр найдвартай, аюулгүй байдаг.'
        },
        {
            category: 'payment',
            question: 'Төлбөр буцаах бодлого юу вэ?',
            answer: 'Хичээл эхэлснээс хойш 7 хоногийн дотор, хичээлийн 20%-иас бага үзсэн тохиолдолд бүрэн төлбөр буцаана.'
        },
        {
            category: 'payment',
            question: 'Хөнгөлөлт байдаг уу?',
            answer: 'Тийм, бид байнга хөнгөлөлттэй үйл ажиллагаа явуулдаг. Мөн олон хичээл худалдан авбал хямдрах боломжтой.'
        },
        {
            category: 'technical',
            question: 'Ямар төхөөрөмж дээр үзэж болох вэ?',
            answer: 'Компьютер, таблет, утас зэрэг бүх төхөөрөмж дээр үзэж болно. Зөвхөн интернет холболт хэрэгтэй.'
        },
        {
            category: 'technical',
            question: 'Видео тасалдаж байвал яах вэ?',
            answer: 'Интернет холболтоо шалгаарай. Асуудал үргэлжилбэл тусламжийн хэсэгт хандаарай.'
        },
        {
            category: 'technical',
            question: 'Offline үзэж болох уу?',
            answer: 'Одоогоор offline үзэх боломжгүй. Бид ирээдүйд энэ функцийг нэмэх төлөвлөгөөтэй.'
        },
        {
            category: 'account',
            question: 'Нууц үгээ мартсан бол яах вэ?',
            answer: 'Бид Google OAuth ашигладаг тул нууц үг шаардлагагүй. Google бүртгэлээрээ нэвтэрнэ үү.'
        },
        {
            category: 'account',
            question: 'Профайл мэдээллээ хэрхэн өөрчлөх вэ?',
            answer: 'Профайл хуудсандаа орж, "Засах" товчийг дарж мэдээллээ шинэчилнэ үү.'
        },
        {
            category: 'account',
            question: 'Бүртгэлээ устгаж болох уу?',
            answer: 'Тийм, тохиргоо хэсэгт орж бүртгэлээ устгах боломжтой. Гэхдээ энэ нь таны бүх мэдээллийг устгана.'
        }
    ]

    const filteredFaqs = faqs.filter(faq => {
        const matchesCategory = activeCategory === 'all' || faq.category === activeCategory
        const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })

    return (
        <>
            <Header />

            <main className="min-h-screen bg-black pt-24 pb-12">
                {/* Hero */}
                <section className="px-4 mb-16">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
                                Тусламж хэрэгтэй юу?
                            </span>
                        </h1>
                        <p className="text-xl text-gray-400 mb-8">
                            Түгээмэл асуултын хариултыг эндээс олоорой
                        </p>

                        {/* Search */}
                        <div className="relative max-w-2xl mx-auto">
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
                                placeholder="Асуулт хайх..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors"
                            />
                        </div>
                    </div>
                </section>

                {/* Categories */}
                <section className="px-4 mb-12">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-wrap justify-center gap-3">
                            {categories.map(category => (
                                <button
                                    key={category.id}
                                    onClick={() => setActiveCategory(category.id)}
                                    className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center space-x-2 ${activeCategory === category.id
                                        ? 'bg-accent text-white shadow-lg shadow-accent/30'
                                        : 'bg-gray-900 text-gray-400 hover:bg-gray-800 border border-gray-700'
                                        }`}
                                >
                                    <span>{category.icon}</span>
                                    <span>{category.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ Accordion */}
                <section className="px-4 mb-16">
                    <div className="max-w-4xl mx-auto">
                        {filteredFaqs.length === 0 ? (
                            <div className="text-center py-16">
                                <p className="text-gray-400 text-lg">Хайлтад тохирох асуулт олдсонгүй</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {filteredFaqs.map((faq, index) => (
                                    <div
                                        key={index}
                                        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700 overflow-hidden hover:border-accent/50 transition-colors"
                                    >
                                        <button
                                            onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                                            className="w-full px-6 py-5 flex items-center justify-between text-left"
                                        >
                                            <span className="text-white font-semibold pr-4">{faq.question}</span>
                                            <svg
                                                className={`w-5 h-5 text-accent flex-shrink-0 transition-transform ${openFaqIndex === index ? 'rotate-180' : ''
                                                    }`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        {openFaqIndex === index && (
                                            <div className="px-6 pb-5">
                                                <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* Contact Support */}
                <section className="px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-gradient-to-r from-accent to-blue-600 rounded-2xl p-8 md:p-12 text-center">
                            <h2 className="text-3xl font-bold text-white mb-4">
                                Хариулт олдсонгүй юу?
                            </h2>
                            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                                Бидэнтэй шууд холбогдоорой. Манай баг танд туслахад бэлэн байна.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a
                                    href="/contact"
                                    className="inline-block px-8 py-4 bg-white text-accent rounded-lg font-bold hover:bg-gray-100 transition-colors"
                                >
                                    Холбоо барих
                                </a>
                                <a
                                    href="mailto:jawhactwt@gmail.com"
                                    className="inline-block px-8 py-4 bg-white/10 text-white rounded-lg font-bold hover:bg-white/20 transition-colors border-2 border-white"
                                >
                                    И-мэйл илгээх
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    )
}
