import fetch, { queryClient } from '../services/api.ts';

/**
 * Get the URL for a local image asset
 * @param name - The relative path to the image in the assets directory
 * @returns The full URL to the image
 */
export function getImageUrl(name: string): string {
  try {
    return new URL(`../assets/images/${name}`, import.meta.url).href;
  } catch (error) {
    console.error(`Failed to load image: ${name}`, error);
    return '/placeholder.svg';
  }
}

/**
 * Get the URL for a remote image by ID
 * @param id - The ID of the remote image
 * @returns Promise resolving to the image data
 */
export async function getRemoteImageUrl(id: number) {
  return queryClient.fetchQuery({
    queryKey: ['image', id],
    queryFn: async () => {
      try {
        const response = await fetch({
          url: `media/${id}`,
          method: 'GET'
        });
        return response.data;
      } catch (error) {
        console.error(`Failed to fetch remote image with ID: ${id}`, error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5 // Cache for 5 minutes
  });
}

/**
 * Optimize image dimensions based on device
 * @param width - Original width
 * @param height - Original height
 * @returns Optimized dimensions
 */
export function getOptimizedImageDimensions(
  width: number,
  height: number
): { width: number; height: number } {
  const devicePixelRatio = window.devicePixelRatio || 1;
  const screenWidth = window.innerWidth;

  // If image is wider than screen, scale it down
  if (width > screenWidth) {
    const ratio = height / width;
    const newWidth = screenWidth;
    const newHeight = Math.round(newWidth * ratio);

    return {
      width: Math.round(newWidth * devicePixelRatio),
      height: Math.round(newHeight * devicePixelRatio)
    };
  }

  return {
    width: Math.round(width * devicePixelRatio),
    height: Math.round(height * devicePixelRatio)
  };
}
