// Prefix a root-relative path with the configured basePath (for GitHub Pages
// subdirectory hosting). Returns the path unchanged when basePath is empty.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
export function path(p: string): string {
  if (!p.startsWith("/")) return p;
  return `${BASE_PATH}${p}`;
}
