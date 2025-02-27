import jwt from 'jsonwebtoken';
import { NextRequest } from "next/server";
import { JWTPayload } from '../types';


export function verifyToken(request: NextRequest): JWTPayload  | null {
    try {
        const jwtToken = request.cookies.get("jwtToken")?.value as string;
        if (!jwtToken) return null;

        const token = jwt.verify(jwtToken, process.env.JWT_SECRET as string) as JWTPayload;

        return token;
    } catch {
        return null;

    }
}