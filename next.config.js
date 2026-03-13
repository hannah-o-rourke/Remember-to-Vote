/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: '/Remember-to-Vote',
    assetPrefix: '/Remember-to-Vote/',
    images: {
          unoptimized: true,
    },
};

module.exports = nextConfig;
