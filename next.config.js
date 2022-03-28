/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        minimumCacheTTL: 60,
        domains: ['gimg2.baidu.com', 'img.xclient.info'],
    },
}

module.exports = nextConfig
