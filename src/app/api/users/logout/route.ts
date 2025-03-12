import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/**
 * @method  POST 
 * @routs   ~/api/users/logout
 * @desc    Logout user
 * @access  private
 */
export async function POST() {
    try {
        // (await cookies()).delete("jwtToken"); 
        const cookieStore = await cookies();

        cookieStore.set("jwtToken", "", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/",
            // domain: "localhost",
            domain: "snapgram-social-media-app.netlify.app",
            expires: new Date(0),  
        });
        return NextResponse.json({ message: "Logged out successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
