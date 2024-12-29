/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/user/:path*',
                destination: 'http://auth-service/api/user/:path*', // Proxy to backend
            },
            {
                source: '/video/:path*',
                destination: 'http://stream-service/video/:path*', // Proxy to backend
            },
            {
                source: '/api/content/:path*',
                destination: 'http://upload-service/api/content/:path*', // Proxy to backend
            },
            {
                source: '/api/profile/:path*',
                destination: 'http://userutil-service/api/profile/:path*', // Proxy to backend
            },
        ];
    },
    output: "standalone",
};

export default nextConfig;
