// import jwt from "jsonwebtoken";
// import { JWTPayload } from "../types";
// import { serialize } from "cookie";

// export function setCookie(jwtPayload: JWTPayload): string {
//     const token = generateJWT(jwtPayload);

//     const isProduction = process.env.NODE_ENV === "production";

//     const cookie = serialize("jwtToken", token, {
//         httpOnly: true,
//         secure: isProduction, // في الإنتاج فقط
//         sameSite: isProduction ? "none" : "lax", // نفس القاعدة، في الإنتاج تكون "none"
//         path: "/",
//         // في بيئة التطوير، لا تستخدم نطاق محدد للكوكي، فقط استخدم النطاق الحالي.
//         domain: isProduction ? ".snapgram-social-media-app.netlify.app" : undefined,
//         maxAge: 60 * 60 * 24 * 30, // الكوكي ستظل لمدة 30 يومًا
//     });

//     return cookie;
// }


import jwt from "jsonwebtoken";
import { JWTPayload } from "../types";
import { serialize } from "cookie";
import { DOMAIN } from "./constants";


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
        domain: DOMAIN, 
        maxAge: 60 * 60 * 24 * 30, 
    });

    return cookie;
}
