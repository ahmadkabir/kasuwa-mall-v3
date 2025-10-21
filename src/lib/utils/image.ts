/**
 * Image utility functions for handling product images
 * Supports multiple image formats and provides fallbacks
 */

/**
 * Get the backend URL from environment or default
 */
export function getBackendUrl(): string {
  return (import.meta.env?.VITE_API_URL as string) || 'http://localhost:3002'
}

/**
 * Process image URL to handle different formats
 * - Comma-separated URLs (returns first)
 * - Relative paths (prepends backend URL)
 * - Absolute URLs (returns as-is)
 * - Empty/null (returns null)
 */
export function getProductImageUrl(imageUrls: string | null | undefined): string | null {
  if (!imageUrls || imageUrls.trim() === '') {
    return null
  }

  // Split by comma and get first image
  const images = imageUrls.split(',').map(url => url.trim()).filter(Boolean)
  
  if (images.length === 0) {
    return null
  }

  const firstImage = images[0]

  // If it's already a full URL, return it
  if (firstImage.startsWith('http://') || firstImage.startsWith('https://')) {
    return firstImage
  }

  // If it's a relative path starting with /, prepend backend URL
  if (firstImage.startsWith('/')) {
    return `${getBackendUrl()}${firstImage}`
  }

  // If it's a relative path without /, prepend backend URL with /
  return `${getBackendUrl()}/${firstImage}`
}

/**
 * Get all image URLs from a comma-separated string
 */
export function getAllProductImageUrls(imageUrls: string | null | undefined): string[] {
  if (!imageUrls || imageUrls.trim() === '') {
    return []
  }

  return imageUrls
    .split(',')
    .map(url => url.trim())
    .filter(Boolean)
    .map(url => {
      // If it's already a full URL, return it
      if (url.startsWith('http://') || url.startsWith('https://')) {
        return url
      }

      // If it's a relative path starting with /, prepend backend URL
      if (url.startsWith('/')) {
        return `${getBackendUrl()}${url}`
      }

      // If it's a relative path without /, prepend backend URL with /
      return `${getBackendUrl()}/${url}`
    })
}

/**
 * Get placeholder image URL
 */
export function getPlaceholderImage(): string {
  return '/placeholder-product.jpg'
}

/**
 * Check if an image URL is valid
 */
export function isValidImageUrl(url: string | null | undefined): boolean {
  if (!url || url.trim() === '') {
    return false
  }

  // Check if it's a valid URL format
  try {
    new URL(url)
    return true
  } catch {
    // If not a full URL, check if it's a valid path
    return url.startsWith('/') || !url.includes(' ')
  }
}

/**
 * Preload an image
 */
export function preloadImage(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = reject
    img.src = url
  })
}

/**
 * Get optimized image URL with transformations (if using CDN)
 * For future implementation with Cloudinary or similar
 */
export function getOptimizedImageUrl(
  imageUrl: string,
  _options?: {
    width?: number
    height?: number
    quality?: number
    format?: 'webp' | 'jpg' | 'png'
  }
): string {
  // For now, just return the original URL
  // In the future, this can be extended to add CDN transformations
  return imageUrl
}
