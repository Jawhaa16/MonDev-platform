import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function PrivacyPage() {
    return (
        <>
            <Header />

            <main className="min-h-screen bg-black pt-24 pb-12">
                <div className="px-4">
                    <div className="max-w-4xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-12">
                            <h1 className="text-5xl md:text-6xl font-bold mb-6">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
                                    Нууцлалын бодлого
                                </span>
                            </h1>
                            <p className="text-gray-400">
                                Сүүлд шинэчлэгдсэн: 2024 оны 12-р сар
                            </p>
                        </div>

                        {/* Content */}
                        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 border border-gray-700 space-y-8">
                            {/* Introduction */}
                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">1. Танилцуулга</h2>
                                <p className="text-gray-400 leading-relaxed">
                                    MonDev.mn ("бид", "манай") нь таны хувийн мэдээллийн нууцлалыг хамгаалахыг эрхэмлэдэг.
                                    Энэхүү нууцлалын бодлого нь бидний цуглуулдаг мэдээлэл, түүнийг хэрхэн ашигладаг,
                                    хамгаалдаг талаар тайлбарладаг.
                                </p>
                            </section>

                            {/* Information We Collect */}
                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">2. Цуглуулдаг мэдээлэл</h2>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-lg font-semibold text-white mb-2">2.1 Хувийн мэдээлэл</h3>
                                        <p className="text-gray-400 leading-relaxed mb-2">
                                            Та бүртгүүлэх үед бид дараах мэдээллийг цуглуулна:
                                        </p>
                                        <ul className="list-disc list-inside text-gray-400 space-y-1 ml-4">
                                            <li>Нэр</li>
                                            <li>И-мэйл хаяг</li>
                                            <li>Профайл зураг (Google-ээс)</li>
                                            <li>Google ID</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-white mb-2">2.2 Автоматаар цуглуулдаг мэдээлэл</h3>
                                        <ul className="list-disc list-inside text-gray-400 space-y-1 ml-4">
                                            <li>IP хаяг</li>
                                            <li>Хөтөч төрөл болон хувилбар</li>
                                            <li>Төхөөрөмжийн мэдээлэл</li>
                                            <li>Хуудас үзсэн түүх</li>
                                            <li>Cookies болон ижил төстэй технологи</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-white mb-2">2.3 Хэрэглээний мэдээлэл</h3>
                                        <ul className="list-disc list-inside text-gray-400 space-y-1 ml-4">
                                            <li>Үзсэн хичээлүүд</li>
                                            <li>Суралцах явц</li>
                                            <li>Шалгалтын үр дүн</li>
                                            <li>Төлбөрийн түүх</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            {/* How We Use Information */}
                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">3. Мэдээллийг хэрхэн ашигладаг</h2>
                                <p className="text-gray-400 leading-relaxed mb-4">
                                    Бид цуглуулсан мэдээллээ дараах зорилгоор ашигладаг:
                                </p>
                                <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                                    <li>Үйлчилгээ үзүүлэх, хичээл хүргэх</li>
                                    <li>Хэрэглэгчийн туршлагыг сайжруулах</li>
                                    <li>Төлбөр боловсруулах</li>
                                    <li>Сертификат олгох</li>
                                    <li>И-мэйл мэдэгдэл илгээх</li>
                                    <li>Техникийн дэмжлэг үзүүлэх</li>
                                    <li>Платформыг хөгжүүлэх, шинэчлэх</li>
                                    <li>Аюулгүй байдлыг хангах</li>
                                </ul>
                            </section>

                            {/* Data Sharing */}
                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">4. Мэдээлэл хуваалцах</h2>
                                <p className="text-gray-400 leading-relaxed mb-4">
                                    Бид таны хувийн мэдээллийг дараах тохиолдолд хуваалцаж болно:
                                </p>
                                <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                                    <li><strong className="text-white">Багш нар:</strong> Таны суралцах явц, шалгалтын үр дүн</li>
                                    <li><strong className="text-white">Төлбөрийн үйлчилгээ үзүүлэгчид:</strong> QPay болон бусад төлбөрийн системүүд</li>
                                    <li><strong className="text-white">Хууль ёсны шаардлага:</strong> Хуулийн шаардлагаар</li>
                                    <li><strong className="text-white">Бизнесийн шилжилт:</strong> Компани худалдан авалт, нэгдэх үед</li>
                                </ul>
                                <p className="text-gray-400 leading-relaxed mt-4">
                                    Бид таны мэдээллийг гуравдагч талд зарах, түрээслэхгүй.
                                </p>
                            </section>

                            {/* Data Security */}
                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">5. Мэдээллийн аюулгүй байдал</h2>
                                <p className="text-gray-400 leading-relaxed mb-4">
                                    Бид таны мэдээллийг хамгаалахын тулд дараах арга хэмжээг авдаг:
                                </p>
                                <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                                    <li>256-bit SSL шифрлэлт</li>
                                    <li>Найдвартай өгөгдлийн сан (PostgreSQL)</li>
                                    <li>Тогтмол аюулгүй байдлын шалгалт</li>
                                    <li>Хандалтын хяналт</li>
                                    <li>Нууц үгийг хэзээ ч хадгалдаггүй (OAuth ашиглана)</li>
                                </ul>
                            </section>

                            {/* Cookies */}
                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">6. Cookies</h2>
                                <p className="text-gray-400 leading-relaxed mb-4">
                                    Бид дараах зорилгоор cookies ашигладаг:
                                </p>
                                <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                                    <li>Нэвтэрсэн байдлыг хадгалах</li>
                                    <li>Хэрэглэгчийн тохиргоог санах</li>
                                    <li>Статистик цуглуулах</li>
                                    <li>Платформыг сайжруулах</li>
                                </ul>
                                <p className="text-gray-400 leading-relaxed mt-4">
                                    Та хөтчийнхөө тохиргооноос cookies-г идэвхгүй болгож болно.
                                </p>
                            </section>

                            {/* Your Rights */}
                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">7. Таны эрх</h2>
                                <p className="text-gray-400 leading-relaxed mb-4">
                                    Та дараах эрхтэй:
                                </p>
                                <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                                    <li>Өөрийн мэдээллээ үзэх, засах</li>
                                    <li>Бүртгэлээ устгах</li>
                                    <li>Мэдээлэл цуглуулахыг татгалзах</li>
                                    <li>Мэдээллийн хуулбар авах</li>
                                    <li>И-мэйл мэдэгдлээс татгалзах</li>
                                </ul>
                            </section>

                            {/* Children's Privacy */}
                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">8. Хүүхдийн нууцлал</h2>
                                <p className="text-gray-400 leading-relaxed">
                                    Манай үйлчилгээ 13 насанд хүрээгүй хүүхдэд зориулагдаагүй. Бид санаатайгаар
                                    13 насанд хүрээгүй хүүхдийн мэдээлэл цуглуулдаггүй.
                                </p>
                            </section>

                            {/* Third-Party Links */}
                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">9. Гуравдагч талын холбоос</h2>
                                <p className="text-gray-400 leading-relaxed">
                                    Манай платформ дээр гуравдагч талын вэбсайт руу холбоос байж болно.
                                    Бид тэдгээрийн нууцлалын бодлогод хариуцлага хүлээхгүй.
                                </p>
                            </section>

                            {/* Changes to Policy */}
                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">10. Бодлогын өөрчлөлт</h2>
                                <p className="text-gray-400 leading-relaxed">
                                    Бид энэхүү нууцлалын бодлогыг үе үе шинэчилж болно. Томоохон өөрчлөлтийн
                                    тухай бид и-мэйлээр мэдэгдэнэ.
                                </p>
                            </section>

                            {/* Contact */}
                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">11. Холбоо барих</h2>
                                <p className="text-gray-400 leading-relaxed mb-4">
                                    Нууцлалын бодлоготой холбоотой асуулт байвал бидэнтэй холбогдоно уу:
                                </p>
                                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                                    <p className="text-gray-300">
                                        <strong>И-мэйл:</strong> privacy@mondev.mn<br />
                                        <strong>Хаяг:</strong> Улаанбаатар хот, Сүхбаатар дүүрэг, Монгол Улс
                                    </p>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    )
}
