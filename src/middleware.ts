import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/", "/users", "/explore", "/createPost", "/auth/profile", "/posts", "/PostDetails"];
const publicRoutes = ["/auth/login", "/auth/register"];

export function middleware(request: NextRequest) {
    const response = NextResponse.next();

    const jwtToken = request.cookies.get("jwtToken")?.value;
    const path = request.nextUrl.pathname;
    const isProtected = protectedRoutes.includes(path);
    const isPublic = publicRoutes.includes(path);

    if (isProtected && !jwtToken) {
        return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
    }

    if (isPublic && jwtToken) {
        return NextResponse.redirect(new URL("/", request.nextUrl));
    }

    return response;
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|/public/images|/public/css).*)",
    ],
};
