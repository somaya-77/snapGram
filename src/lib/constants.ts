export const ARTICLE_PER_PAGE = 6;

// const PRODUCTION_DOMAIN = "https://snapgram-social-media-app.netlify.app";
// const DEVELOPMENT_DOMAIN = "http://localhost:3000";

// export const DOMAIN = "http://localhost:3000";


export const DOMAIN = process.env.NODE_ENV === 'production' ? "https://snap-gram-nu.vercel.app/" : "http://localhost:3000";


