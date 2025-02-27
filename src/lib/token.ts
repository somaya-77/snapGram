

import jwt from 'jsonwebtoken';
import { JWTPayload } from '../types';
import { serialize } from 'cookie';

// generate token
export function generateJWT(jwtPayload: JWTPayload): string {
    const privateKey = process.env.JWT_SECRET as string;

    const token = jwt.sign(jwtPayload, privateKey, {
        expiresIn: '30d'
    })
    return token;
}

export function setCookie(jwtPayload: JWTPayload): string {
    const token = generateJWT(jwtPayload);
    const cookie = serialize("jwtToken", token, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 30 days
    })
    return cookie;
}