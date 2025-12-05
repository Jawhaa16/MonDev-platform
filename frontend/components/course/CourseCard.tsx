import Link from 'next/link'
import Image from 'next/image'

interface CourseCardProps {
    id: string
    title: string
    description: string
    thumbnail?: string
    instructor_name?: string
    instructor_avatar?: string
    price?: number
    is_free: boolean
    category?: string
    video_count?: number
}

export default function CourseCard({
    id,
    title,
    description,
    thumbnail,
    instructor_name = 'Багш',
    instructor_avatar,
    price,
    is_free,
    category,
    video_count = 0,
}: CourseCardProps) {
    return (
        <Link href={`/courses/${id}`} className="block group">
            <div className="bg-[#1c1c1c] rounded-2xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:shadow-xl hover:shadow-accent/5 flex flex-col h-full">
                {/* Thumbnail */}
                <div className="relative h-48 w-full bg-gray-900 overflow-hidden shrink-0">
                    {thumbnail ? (
                        <Image
                            src={thumbnail}
                            alt={title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-700">
                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                    )}

                    {/* Category Badge */}
                    {category && (
                        <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-xs font-medium border border-white/10">
                                {category}
                            </span>
                        </div>
                    )}

                    {/* Price Badge */}
                    <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${is_free
                                ? 'bg-green-500 text-white'
                                : 'bg-white text-black'
                            }`}>
                            {is_free ? 'ҮНЭГҮЙ' : `${price?.toLocaleString()}₮`}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors line-clamp-1">
                        {title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-1">
                        {description}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-800 mt-auto">
                        <div className="flex items-center space-x-3">
                            {instructor_avatar ? (
                                <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border border-gray-700">
                                    <Image
                                        src={instructor_avatar}
                                        alt={instructor_name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-accent to-blue-600 flex items-center justify-center text-sm font-semibold shrink-0">
                                    {(instructor_name || 'B')[0].toUpperCase()}
                                </div>
                            )}
                            <span className="text-sm text-gray-400 truncate max-w-[100px]">{instructor_name}</span>
                        </div>

                        {video_count > 0 && (
                            <div className="flex items-center text-gray-500 text-xs">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {video_count} видео
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    )
}
