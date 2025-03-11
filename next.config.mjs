// import { withSentryConfig } from "@sentry/nextjs";
const nextConfig = {
    async headers() {
        return [
            {
                source: "/api/:path*",
                headers: [
                    {
                        key: "Access-Control-Allow-Origin",
                        value: "https://snapgram-social-media-app.netlify.app",
                    },
                    {
                        key: "Access-Control-Allow-Methods",
                        value: "GET, POST, PUT, DELETE, OPTIONS",
                    },
                    {
                        key: "Access-Control-Allow-Headers",
                        value: "Content-Type, Authorization",
                    },
                    {
                        key: "Access-Control-Allow-Credentials",
                        value: "true", 
                    },
                ],
            },
        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: "res.cloudinary.com",
            },
            {
                protocol: 'https',
                hostname: "res.cloudinary.com",
            },
        ],
    },
    env: {
        CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
        CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
        CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    },
};

export default nextConfig;
