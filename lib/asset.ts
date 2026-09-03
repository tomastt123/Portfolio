/**
 * Public-folder paths, prefixed for whichever host is serving us.
 *
 * Next rewrites its own `href`s for `basePath`, but with `images.unoptimized`
 * the image `src` goes out untouched — on GitHub Pages that resolves to the
 * domain root and every picture 404s. So every path into /public goes through
 * here instead of being written inline.
 */
export const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  return `${BASE}${path}`;
}
