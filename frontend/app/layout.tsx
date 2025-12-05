import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'MonDev.mn - Мэргэжилтнүүдийн Сургалт',
    description: 'Мэргэжилтэн болон залуучуудад зориулсан онлайн сургалтын платформ',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="mn">
            <body className={inter.className}>
                {children}
                <Toaster
                    position="top-center"
                    toastOptions={{
                        style: {
                            background: '#333',
                            color: '#fff',
                        },
                        success: {
                            style: {
                                background: '#10B981',
                            },
                        },
                        error: {
                            style: {
                                background: '#EF4444',
                            },
                        },
                    }}
                />
            </body>
        </html>
    )
}
