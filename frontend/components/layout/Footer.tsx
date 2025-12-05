import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="bg-gray-900 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-1">
                        <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                            MonDev.mn
                        </h3>
                        <p className="text-gray-400 text-sm">
                            Мэргэжилтэн болон залуучуудад зориулсан онлайн сургалтын платформ
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Холбоосууд</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/courses" className="text-gray-400 hover:text-white transition-colors text-sm">
                                    Хичээлүүд
                                </Link>
                            </li>
                            <li>
                                <Link href="/instructors" className="text-gray-400 hover:text-white transition-colors text-sm">
                                    Багш нар
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-gray-400 hover:text-white transition-colors text-sm">
                                    Бидний тухай
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Тусламж</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/help" className="text-gray-400 hover:text-white transition-colors text-sm">
                                    Тусламж
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">
                                    Холбоо барих
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Хууль</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
                                    Нууцлалын бодлого
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                                    Үйлчилгээний нөхцөл
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-12 pt-8 border-t border-gray-800 text-center">
                    <p className="text-gray-500 text-sm">
                        &copy; 2025 MonDev.mn. Бүх эрх хуулиар хамгаалагдсан.
                    </p>
                </div>
            </div>
        </footer>
    )
}
