

// import jwt from 'jsonwebtoken';
// import { JWTPayload } from '../types';
// import { serialize } from 'cookie';

// // generate token
// export function generateJWT(jwtPayload: JWTPayload): string {
//     const privateKey = process.env.JWT_SECRET as string;

//     const token = jwt.sign(jwtPayload, privateKey, {
//         expiresIn: '30d'
//     })
//     return token;
// }

// export function setCookie(jwtPayload: JWTPayload): string {
//     const token = generateJWT(jwtPayload);
//     const cookie = serialize("jwtToken", token, {
//         httpOnly: true, 
//         secure: process.env.NODE_ENV === 'production', 
//         sameSite: 'none',
//         path: '/',
//         domain: ".snapgram-social-media-app.netlify.app",
//         maxAge: 60 * 60 * 24 * 30, // 30 days
//     })
//     return cookie;
// }

import jwt from "jsonwebtoken";
import { JWTPayload } from "../types";
import { serialize } from "cookie";


export function generateJWT(jwtPayload: JWTPayload): string {
    const privateKey = process.env.JWT_SECRET as string;

    return jwt.sign(jwtPayload, privateKey, {
        expiresIn: "30d",
    });
}


export function setCookie(jwtPayload: JWTPayload): string {
    const token = generateJWT(jwtPayload);

    const isProduction = process.env.NODE_ENV === "production";

    const cookie = serialize("jwtToken", token, {
        httpOnly: true,
        secure: isProduction, 
        sameSite: isProduction ? "none" : "lax", 
        path: "/",
        domain: isProduction ? ".snapgram-social-media-app.netlify.app" : "http://localhost:3000", 
        maxAge: 60 * 60 * 24 * 30, 
    });

    return cookie;
}
