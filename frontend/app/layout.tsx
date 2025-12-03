import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

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
            <body className={inter.className}>{children}</body>
        </html>
    )
}
