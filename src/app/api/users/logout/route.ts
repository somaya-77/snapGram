import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { NextApiRequest, NextApiResponse } from "next";

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
            domain: "snapgram-social-media-app.netlify.app",
            expires: new Date(0),  
        });
        return NextResponse.json({ message: "Logged out successfully" }, { status: 200 });
    } catch (error) {
        console.error("Logout error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}


// export async function POST(req: NextApiRequest, res: NextApiResponse) {

//     try {
//         res.setHeader("Set-Cookie", "jwtToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly");
//         return res.status(200).json({ message: "Logged out successfully" });
//     } catch (error) {
//         return res.status(500).json({ message: "Internal server error" });
//     }
// }