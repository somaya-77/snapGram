// import { withSentryConfig } from "@sentry/nextjs";
const nextConfig = {
    images: {
        domains: ["res.cloudinary.com"],
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'example.com',
            },
            {
                protocol: 'https',
                hostname: 'example.com',
            },
        ],
    },
    env: {
        NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN,
        CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
        CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
        CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    },
};

export default nextConfig;
