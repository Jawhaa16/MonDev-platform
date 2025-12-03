'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import Button from '../ui/Button'

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState<any>(null)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        // Check if user is logged in
        const token = localStorage.getItem('access_token')
        const userData = localStorage.getItem('user')

        if (token && userData) {
            setIsLoggedIn(true)
            setUser(JSON.parse(userData))
        }

        // Listen for storage changes (when user updates profile)
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'user' && e.newValue) {
                setUser(JSON.parse(e.newValue))
            }
        }

        // Listen for custom user update event
        const handleUserUpdate = () => {
            const updatedUser = localStorage.getItem('user')
            if (updatedUser) {
                setUser(JSON.parse(updatedUser))
            }
        }

        window.addEventListener('storage', handleStorageChange)
        window.addEventListener('userUpdated', handleUserUpdate)

        return () => {
            window.removeEventListener('storage', handleStorageChange)
            window.removeEventListener('userUpdated', handleUserUpdate)
        }
    }, [])


    const handleLogout = () => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('user')
        setIsLoggedIn(false)
        setUser(null)
        window.location.href = '/'
    }

    return (
        <header className={`
      fixed top-0 left-0 right-0 z-40 transition-all duration-300
      ${isScrolled ? 'bg-black/95 backdrop-blur-lg border-b border-gray-800' : 'bg-transparent'}
    `}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                            MonDev.mn
                        </div>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link href="/courses" className="text-gray-300 hover:text-white transition-colors">
                            Хичээлүүд
                        </Link>
                        <Link href="/instructors" className="text-gray-300 hover:text-white transition-colors">
                            Багш нар
                        </Link>
                        <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                            Бидний тухай
                        </Link>
                        <Link href="/help" className="text-gray-300 hover:text-white transition-colors">
                            Тусламж
                        </Link>
                    </nav>

                    {/* Auth Buttons */}
                    <div className="flex items-center space-x-4">
                        {isLoggedIn ? (
                            <>
                                {user?.user_type === 'instructor' && (
                                    <Link
                                        href="/instructor"
                                        className="text-gray-300 hover:text-white transition-colors hidden md:block"
                                    >
                                        Dashboard
                                    </Link>
                                )}

                                <Link
                                    href="/profile"
                                    className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                                >
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-accent to-blue-600 flex items-center justify-center overflow-hidden flex-shrink-0">
                                        {user?.profile_image ? (
                                            <img
                                                src={user.profile_image}
                                                alt={user.full_name || 'User'}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-sm font-bold">
                                                {user?.full_name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
                                            </span>
                                        )}
                                    </div>
                                    <span className="hidden md:block max-w-[150px] truncate">
                                        {user?.full_name || 'User'}
                                    </span>
                                </Link>

                                <button
                                    onClick={handleLogout}
                                    className="text-sm text-gray-400 hover:text-white transition-colors"
                                >
                                    Гарах
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    Нэвтрэх
                                </Link>
                                <Button href="/register" variant="primary" size="sm">
                                    Бүртгүүлэх
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}
