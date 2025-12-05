import api from './api'

export interface UploadResponse {
    url: string
    filename: string
}

/**
 * Upload an image file (for course/video thumbnails)
 */
export async function uploadImage(file: File): Promise<UploadResponse> {
    const formData = new FormData()
    formData.append('file', file)

    const response = await api.post<UploadResponse>('/api/upload/image', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })

    return response.data
}

/**
 * Upload a video file
 */
export async function uploadVideo(file: File, onProgress?: (progress: number) => void): Promise<UploadResponse> {
    const formData = new FormData()
    formData.append('file', file)

    const response = await api.post<UploadResponse>('/api/upload/video', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
            if (onProgress && progressEvent.total) {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                onProgress(percentCompleted)
            }
        }
    })

    return response.data
}

/**
 * Delete an uploaded file
 */
export async function deleteFile(filename: string): Promise<void> {
    await api.delete(`/api/upload/${filename}`)
}

/**
 * Validate image file
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    const maxSize = 5 * 1024 * 1024 // 5MB

    if (!allowedTypes.includes(file.type)) {
        return {
            valid: false,
            error: 'Зөвхөн JPG, PNG, GIF, WEBP форматын зураг оруулна уу'
        }
    }

    if (file.size > maxSize) {
        return {
            valid: false,
            error: 'Зургийн хэмжээ 5MB-аас бага байх ёстой'
        }
    }

    return { valid: true }
}

/**
 * Validate video file
 */
export function validateVideoFile(file: File): { valid: boolean; error?: string } {
    const allowedTypes = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo']
    const maxSize = 500 * 1024 * 1024 // 500MB

    if (!allowedTypes.includes(file.type)) {
        return {
            valid: false,
            error: 'Зөвхөн MP4, WEBM, MOV, AVI форматын видео оруулна уу'
        }
    }

    if (file.size > maxSize) {
        return {
            valid: false,
            error: 'Видеоны хэмжээ 500MB-аас бага байх ёстой'
        }
    }

    return { valid: true }
}
