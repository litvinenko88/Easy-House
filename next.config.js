/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: false
}

module.exports = nextConfig