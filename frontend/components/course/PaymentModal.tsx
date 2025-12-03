'use client'

import { useState } from 'react'
import Modal from '../ui/Modal'
import Button from '../ui/Button'

interface PaymentModalProps {
    isOpen: boolean
    onClose: () => void
    courseId: string
    courseTitle: string
    price: number
}

export default function PaymentModal({
    isOpen,
    onClose,
    courseId,
    courseTitle,
    price
}: PaymentModalProps) {
    const [loading, setLoading] = useState(false)
    const [qpayData, setQpayData] = useState<any>(null)
    const [error, setError] = useState('')

    const handlePayment = async () => {
        try {
            setLoading(true)
            setError('')

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payments/create-invoice`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                },
                body: JSON.stringify({ course_id: courseId })
            })

            if (!response.ok) {
                throw new Error('Төлбөр үүсгэхэд алдаа гарлаа')
            }

            const data = await response.json()
            setQpayData(data.qpay_data)
        } catch (err: any) {
            setError(err.message || 'Алдаа гарлаа')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Төлбөр төлөх"
            size="md"
        >
            <div className="space-y-6">
                {/* Course Info */}
                <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                    <div className="text-sm text-gray-400 mb-1">Хичээл</div>
                    <div className="font-semibold mb-3">{courseTitle}</div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-700">
                        <span className="text-gray-400">Үнэ:</span>
                        <span className="text-2xl font-bold text-accent">
                            {price.toLocaleString()}₮
                        </span>
                    </div>
                </div>

                {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
                        {error}
                    </div>
                )}

                {!qpayData ? (
                    <>
                        {/* Payment Info */}
                        <div className="space-y-3 text-sm text-gray-400">
                            <div className="flex items-start space-x-2">
                                <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <p>Төлбөр амжилттай төлөгдсөний дараа хичээл нээгдэнэ</p>
                            </div>

                            <div className="flex items-start space-x-2">
                                <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                <p>Аюулгүй QPay системээр төлнө</p>
                            </div>

                            <div className="flex items-start space-x-2">
                                <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p>Хичээлд насан туршдаа хандах эрхтэй</p>
                            </div>
                        </div>

                        {/* Pay Button */}
                        <Button
                            onClick={handlePayment}
                            disabled={loading}
                            variant="primary"
                            className="w-full"
                        >
                            {loading ? 'Уншиж байна...' : 'QPay-ээр төлөх'}
                        </Button>
                    </>
                ) : (
                    <>
                        {/* QR Code Display */}
                        <div className="text-center">
                            <p className="text-gray-400 mb-4">
                                QPay аппликэйшн ашиглан QR code уншуулна уу
                            </p>

                            {qpayData.qr_image && (
                                <div className="bg-white p-4 rounded-lg inline-block">
                                    <img
                                        src={qpayData.qr_image}
                                        alt="QPay QR Code"
                                        className="w-64 h-64 mx-auto"
                                    />
                                </div>
                            )}

                            <p className="text-sm text-gray-500 mt-4">
                                Төлбөр төлөгдсөний дараа автоматаар хичээл нээгдэнэ
                            </p>
                        </div>
                    </>
                )}
            </div>
        </Modal>
    )
}
