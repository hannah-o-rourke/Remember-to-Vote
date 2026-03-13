/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: '/Remember-to-Vote',
    assetPrefix: '/Remember-to-Vote/',
    images: {
        unoptimized: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

module.exports = nextConfig;
