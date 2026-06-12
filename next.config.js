/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

module.exports = {
  reactStrictMode: true,
  output: "export",                 // Static HTML/CSS/JS for GitHub Pages
  images: { unoptimized: true },    // next/image without a server
  trailingSlash: true,              // Avoids `/log` 404s on Pages
  basePath,                         // e.g. "/fitsprout" when hosted at user.github.io/fitsprout
  assetPrefix: basePath || undefined,
};
