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

    const cookie = serialize("jwtToken", token, {
        httpOnly: true,
        secure: true, 
        sameSite: "none",
        path: "/",
        domain: ".snapgram-social-media-app.netlify.app",
        maxAge: 60 * 60 * 24 * 30, 

        // httpOnly: true,
        // secure: true, 
        // sameSite: "none",
        // path: "/",
        // domain: "localhost",
        // maxAge: 60 * 60 * 24 * 30, 
    });
    return cookie;
}


// const isProduction = process.env.NODE_ENV === "production";