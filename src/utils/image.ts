/**
 * Build a full image URL using PUBLIC_IMAGE_BASE_URL.
 *
 * @param path - The relative path of the image (ex: "/vietnam/ha-giang/img.jpg")
 * @returns Full URL string (ex: "https://images.lordoftrees.com/vietnam/ha-giang/img.jpg")
 */
export function getImageUrl(path?: string | null): string | null {
  if (!path) return null;

  const base = import.meta.env.PUBLIC_IMAGE_BASE_URL;

  // Ensure no accidental double-slashes
  return new URL(path.replace(/^\/+/, ''), base.endsWith('/') ? base : base + '/').toString();
}
