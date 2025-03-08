// import { NextRequest, NextResponse } from "next/server";

// const protectedRoutes = ["/", "/users","/explore", "/createPost", "/auth/profile/path*", "/posts/path*","/PostDetails"];
// const publicRoutes = ["/auth/login", "/auth/register"];

// export default async function middleware(request: NextRequest) {
//     // const cookies = request.cookies;
//     const jwtToken = request.cookies.get('jwtToken')?.value ;
//     const path = request.nextUrl.pathname;
//     const isProtected = protectedRoutes.includes(path);
//     const isPublic = publicRoutes.includes(path);
//     if (isProtected && !jwtToken) {
//         return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
//     }

//     if (isPublic && jwtToken) {
//         return NextResponse.redirect(new URL("/", request.nextUrl));
//     }

//     if (isProtected && jwtToken) {
//         return NextResponse.next();
//     }
// }

// export const config = {
//     matcher: [
//         "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|/public/images|/public/css).*)",
//     ],
// };

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/", "/users", "/explore", "/createPost", "/auth/profile", "/posts", "/PostDetails"];
const publicRoutes = ["/auth/login", "/auth/register"];

export function middleware(request: NextRequest) {
    const response = NextResponse.next();

    // إعدادات CORS (لضمان عمل الكوكيز عبر النطاقات)
    response.headers.set("Access-Control-Allow-Origin", "https://snap-gram-nu.vercel.app");
    response.headers.set("Access-Control-Allow-Credentials", "true");
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

    // جلب التوكن من الكوكيز
    const jwtToken = request.cookies.get("jwtToken")?.value;
    const path = request.nextUrl.pathname;
    const isProtected = protectedRoutes.includes(path);
    const isPublic = publicRoutes.includes(path);

    // حماية المسارات الخاصة
    if (isProtected && !jwtToken) {
        return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
    }

    // منع المستخدم المسجّل من الوصول إلى صفحات التسجيل
    if (isPublic && jwtToken) {
        return NextResponse.redirect(new URL("/", request.nextUrl));
    }

    return response;
}

// تطابق جميع المسارات عدا بعض الملفات الخاصة بـ Next.js
export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|/public/images|/public/css).*)",
    ],
};
