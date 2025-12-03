import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function Home() {
    return (
        <>
            <Header />

            <main className="min-h-screen bg-black pt-16">
                {/* Hero Section */}
                <section className="relative h-screen flex items-center justify-center overflow-hidden">
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>

                    {/* Content */}
                    <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                        <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-500">
                            MonDev.mn
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-400 mb-8 font-light">
                            Дэлхийн шилдэг компаниудад ажилдаг мэргэжилтнүүдээс суралцаарай
                        </p>

                        <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
                            Мэргэжилтэн болон залуучуудад зориулсан онлайн сургалтын платформ
                        </p>

                        <div className="flex gap-4 justify-center flex-wrap">
                            <Link
                                href="/courses"
                                className="px-8 py-4 bg-accent text-white rounded-lg font-semibold hover:bg-blue-600 transform hover:scale-105 transition-all shadow-lg hover:shadow-accent/50"
                            >
                                Хичээлүүд үзэх
                            </Link>

                            <Link
                                href="/register"
                                className="px-8 py-4 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700 transform hover:scale-105 transition-all border border-gray-700"
                            >
                                Бүртгүүлэх
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
                            <div>
                                <div className="text-4xl font-bold text-accent mb-2">500+</div>
                                <div className="text-gray-500">Хичээлүүд</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-accent mb-2">50+</div>
                                <div className="text-gray-500">Багш нар</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-accent mb-2">10k+</div>
                                <div className="text-gray-500">Суралцагчид</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-accent mb-2">4.8/5</div>
                                <div className="text-gray-500">Үнэлгээ</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20 px-4 bg-gray-900">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-4xl font-bold text-center mb-16">Яагаад MonDev.mn вэ?</h2>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-gray-800 p-8 rounded-xl hover:bg-gray-750 transition-all border border-gray-700">
                                <div className="text-4xl mb-4">🎓</div>
                                <h3 className="text-2xl font-semibold mb-4">Мэргэжлийн багш нар</h3>
                                <p className="text-gray-400">
                                    Google, Meta, Amazon зэрэг компаниудад ажилдаг мэргэжилтнүүдээс шууд суралцаарай
                                </p>
                            </div>

                            <div className="bg-gray-800 p-8 rounded-xl hover:bg-gray-750 transition-all border border-gray-700">
                                <div className="text-4xl mb-4">💰</div>
                                <h3 className="text-2xl font-semibold mb-4">Төрөл бүрийн хичээлүүд</h3>
                                <p className="text-gray-400">
                                    Үнэгүй болон төлбөртэй хичээлүүд. Та өөрт тохирсон хичээлээ сонгоорой
                                </p>
                            </div>

                            <div className="bg-gray-800 p-8 rounded-xl hover:bg-gray-750 transition-all border border-gray-700">
                                <div className="text-4xl mb-4">🔒</div>
                                <h3 className="text-2xl font-semibold mb-4">Аюулгүй систем</h3>
                                <p className="text-gray-400">
                                    Таны мэдээллийг хамгаалах өндөр түвшний нууцлал болон аюулгүй байдал
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 px-4 bg-black">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl font-bold mb-6">Өнөөдөр эхлээрэй</h2>
                        <p className="text-xl text-gray-400 mb-8">
                            Мэргэжилтэн нарын туршлага, зөвлөгөөг хүртээрэй
                        </p>

                        <Link
                            href="/register"
                            className="inline-block px-10 py-4 bg-gradient-to-r from-accent to-blue-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-accent transform hover:scale-105 transition-all shadow-xl"
                        >
                            Бүртгүүлэх
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    )
}
