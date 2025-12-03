import Link from 'next/link'
import Card from '../ui/Card'

interface CourseCardProps {
    id: string
    title: string
    description: string
    thumbnail?: string
    instructor_name: string
    price?: number
    is_free: boolean
    category?: string
}

export default function CourseCard({
    id,
    title,
    description,
    thumbnail,
    instructor_name,
    price,
    is_free,
    category
}: CourseCardProps) {
    return (
        <Link href={`/courses/${id}`}>
            <Card hover className="h-full flex flex-col">
                {/* Thumbnail */}
                <div className="relative w-full h-48 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg mb-4 overflow-hidden">
                    {thumbnail ? (
                        <img
                            src={thumbnail}
                            alt={title}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <svg className="w-16 h-16 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                        </div>
                    )}

                    {/* Category Badge */}
                    {category && (
                        <div className="absolute top-3 left-3">
                            <span className="px-3 py-1 bg-black/70 backdrop-blur-sm text-xs font-semibold rounded-full">
                                {category}
                            </span>
                        </div>
                    )}

                    {/* Price Badge */}
                    <div className="absolute top-3 right-3">
                        {is_free ? (
                            <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                                ҮНЭГҮЙ
                            </span>
                        ) : (
                            <span className="px-3 py-1 bg-accent text-white text-xs font-bold rounded-full">
                                {price?.toLocaleString()}₮
                            </span>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                    <h3 className="text-lg font-semibold mb-2 line-clamp-2 hover:text-accent transition-colors">
                        {title}
                    </h3>

                    <p className="text-sm text-gray-400 mb-4 line-clamp-2 flex-1">
                        {description}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-accent to-blue-600 flex items-center justify-center text-sm font-semibold">
                                {instructor_name[0]}
                            </div>
                            <span className="text-sm text-gray-400">{instructor_name}</span>
                        </div>

                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </Card>
        </Link>
    )
}
