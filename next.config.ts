// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Add this to help with hydration
  experimental: {
    // This helps with chrome extension related issues
    optimizeCss: true,
    // This can help with hydration in some cases
    scrollRestoration: true,
  }
}

module.exports = nextConfig