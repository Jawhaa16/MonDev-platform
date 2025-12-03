import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function TermsPage() {
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
                                    Үйлчилгээний нөхцөл
                                </span>
                            </h1>
                            <p className="text-gray-400">
                                Сүүлд шинэчлэгдсэн: 2024 оны 12-р сар
                            </p>
                        </div>

                        {/* Content */}
                        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 border border-gray-700 space-y-8">
                            {/* Acceptance */}
                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">1. Нөхцөл зөвшөөрөх</h2>
                                <p className="text-gray-400 leading-relaxed">
                                    MonDev.mn платформыг ашигласнаар та эдгээр үйлчилгээний нөхцөлийг бүрэн хүлээн
                                    зөвшөөрч байна. Хэрэв та эдгээр нөхцөлтэй санал нийлэхгүй бол платформыг ашиглахгүй байна уу.
                                </p>
                            </section>

                            {/* Account Registration */}
                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">2. Бүртгэл үүсгэх</h2>
                                <div className="space-y-4">
                                    <p className="text-gray-400 leading-relaxed">
                                        Платформ ашиглахын тулд та бүртгэл үүсгэх шаардлагатай. Та дараах зүйлийг хүлээн зөвшөөрч байна:
                                    </p>
                                    <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                                        <li>Үнэн зөв мэдээлэл өгөх</li>
                                        <li>Бүртгэлийн мэдээллээ шинэчилж байх</li>
                                        <li>Бүртгэлийнхээ аюулгүй байдлыг хариуцах</li>
                                        <li>Бүртгэлээ бусдад дамжуулахгүй байх</li>
                                        <li>Хууль бус үйл ажиллагаанд ашиглахгүй байх</li>
                                    </ul>
                                </div>
                            </section>

                            {/* User Types */}
                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">3. Хэрэглэгчийн төрөл</h2>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-lg font-semibold text-white mb-2">3.1 Суралцагч</h3>
                                        <p className="text-gray-400 leading-relaxed">
                                            Суралцагчид хичээл үзэх, материал татаж авах, шалгалт өгөх эрхтэй.
                                            Худалдан авсан хичээлээ хязгааргүй хугацаанд үзэх боломжтой.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white mb-2">3.2 Багш</h3>
                                        <p className="text-gray-400 leading-relaxed">
                                            Багш нар хичээл оруулах, материал хуваалцах, суралцагчидтай харилцах эрхтэй.
                                            Багш нар платформын дүрэм журмыг дагаж мөрдөх үүрэгтэй.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Course Purchase */}
                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">4. Хичээл худалдан авах</h2>
                                <div className="space-y-4">
                                    <p className="text-gray-400 leading-relaxed">
                                        Хичээл худалдан авахдаа дараах зүйлийг анхаарна уу:
                                    </p>
                                    <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                                        <li>Бүх үнэ нь Монгол төгрөгөөр (₮) илэрхийлэгдсэн</li>
                                        <li>Төлбөр төлсний дараа хичээл шууд нээгдэнэ</li>
                                        <li>Худалдан авсан хичээлээ хязгааргүй үзэж болно</li>
                                        <li>Хичээлийг бусдад дамжуулах, хуулбарлах хориотой</li>
                                        <li>Үнэ өөрчлөгдөж болох ч таны худалдан авсан хичээл өөрчлөгдөхгүй</li>
                                    </ul>
                                </div>
                            </section>

                            {/* Refund Policy */}
                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">5. Төлбөр буцаах бодлого</h2>
                                <div className="space-y-4">
                                    <p className="text-gray-400 leading-relaxed">
                                        Дараах нөхцөл хангагдвал төлбөр буцаана:
                                    </p>
                                    <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                                        <li>Хичээл худалдан авснаас хойш 7 хоногийн дотор</li>
                                        <li>Хичээлийн 20%-иас бага үзсэн байх</li>
                                        <li>Техникийн асуудлаас болж хичээл үзэх боломжгүй байсан</li>
                                    </ul>
                                    <p className="text-gray-400 leading-relaxed mt-4">
                                        Төлбөр буцаах хүсэлтийг support@mondev.mn хаягаар илгээнэ үү.
                                    </p>
                                </div>
                            </section>

                            {/* Intellectual Property */}
                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">6. Оюуны өмч</h2>
                                <div className="space-y-4">
                                    <p className="text-gray-400 leading-relaxed">
                                        Платформ дээрх бүх контент (хичээл, видео, текст, зураг) нь:
                                    </p>
                                    <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                                        <li>Багш эсвэл MonDev.mn-ийн өмч</li>
                                        <li>Зөвхөн хувийн хэрэглээнд зориулагдсан</li>
                                        <li>Хуулбарлах, дахин түгээх хориотой</li>
                                        <li>Арилжааны зорилгоор ашиглах хориотой</li>
                                    </ul>
                                </div>
                            </section>

                            {/* Instructor Revenue */}
                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">7. Багшийн орлого</h2>
                                <div className="space-y-4">
                                    <p className="text-gray-400 leading-relaxed">
                                        Багш нарын орлого дараах байдлаар тооцогдоно:
                                    </p>
                                    <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                                        <li>Платформын хураамж: 15%</li>
                                        <li>Багшийн хувь: 85%</li>
                                        <li>Орлогыг сар бүр тооцож, дараа сард олгоно</li>
                                        <li>Хамгийн бага төлбөр: 100,000₮</li>
                                    </ul>
                                </div>
                            </section>

                            {/* Prohibited Activities */}
                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">8. Хориотой үйлдлүүд</h2>
                                <p className="text-gray-400 leading-relaxed mb-4">
                                    Дараах үйлдлүүд хатуу хориотой:
                                </p>
                                <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                                    <li>Хуурамч мэдээлэл өгөх</li>
                                    <li>Бусдын бүртгэл ашиглах</li>
                                    <li>Контентыг хууль бусаар хуулбарлах, түгээх</li>
                                    <li>Платформд халдлага хийх, эвдэх</li>
                                    <li>Бусдыг доромжлох, заналхийлэх</li>
                                    <li>Спам илгээх</li>
                                    <li>Хууль бус контент оруулах</li>
                                </ul>
                            </section>

                            {/* Account Termination */}
                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">9. Бүртгэл цуцлах</h2>
                                <p className="text-gray-400 leading-relaxed mb-4">
                                    Бид дараах тохиолдолд бүртгэлийг цуцлах эрхтэй:
                                </p>
                                <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                                    <li>Үйлчилгээний нөхцөл зөрчих</li>
                                    <li>Хууль бус үйл ажиллагаа явуулах</li>
                                    <li>Бусдад хор хөнөөл учруулах</li>
                                    <li>Төлбөр төлөхгүй байх</li>
                                </ul>
                            </section>

                            {/* Limitation of Liability */}
                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">10. Хариуцлагын хязгаарлалт</h2>
                                <p className="text-gray-400 leading-relaxed">
                                    MonDev.mn нь платформ ашигласнаас үүдэн гарсан шууд болон шууд бус хохирлыг
                                    хариуцахгүй. Үйлчилгээ "байгаа байдлаар" үзүүлэгдэнэ.
                                </p>
                            </section>

                            {/* Changes to Terms */}
                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">11. Нөхцөлийн өөрчлөлт</h2>
                                <p className="text-gray-400 leading-relaxed">
                                    Бид үйлчилгээний нөхцөлийг үе үе шинэчилж болно. Томоохон өөрчлөлтийн тухай
                                    и-мэйлээр мэдэгдэнэ. Үргэлжлүүлэн ашигласнаар та шинэчлэгдсэн нөхцөлийг
                                    хүлээн зөвшөөрч байна.
                                </p>
                            </section>

                            {/* Governing Law */}
                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">12. Хууль эрх зүй</h2>
                                <p className="text-gray-400 leading-relaxed">
                                    Энэхүү гэрээ нь Монгол Улсын хуулиар зохицуулагдана. Маргаан үүссэн тохиолдолд
                                    Монгол Улсын шүүхэд хандана.
                                </p>
                            </section>

                            {/* Contact */}
                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">13. Холбоо барих</h2>
                                <p className="text-gray-400 leading-relaxed mb-4">
                                    Үйлчилгээний нөхцөлтэй холбоотой асуулт байвал:
                                </p>
                                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                                    <p className="text-gray-300">
                                        <strong>И-мэйл:</strong> legal@mondev.mn<br />
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
