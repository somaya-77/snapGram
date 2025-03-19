import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { JWTPayload } from "../types";

export function generateJWT(jwtPayload: JWTPayload): string {
    const privateKey = process.env.JWT_SECRET as string;

    return jwt.sign(jwtPayload, privateKey, {
        expiresIn: "30d",
    });
}

export function setCookie(jwtPayload: JWTPayload): string {
    const token = generateJWT(jwtPayload);

    const cookie = serialize("jwtToken", token, {
        httpOnly: true,
        secure: true, 
        sameSite: "none",
        path: "/",
        // domain: ".localhost",
        domain: ".snapgram-social-media-app.netlify.app",
        maxAge: 60 * 60 * 24 * 30,  
    });
    return cookie;
}



