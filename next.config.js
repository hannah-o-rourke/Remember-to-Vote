/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: '',
    assetPrefix: '/',
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
