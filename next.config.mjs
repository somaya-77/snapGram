// import { withSentryConfig } from "@sentry/nextjs";
const nextConfig = {
   
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
