/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Do not set basePath or assetPrefix; app is served at root.
  // Avoid rewrites/redirects that touch _next or static assets.
}

module.exports = nextConfig


