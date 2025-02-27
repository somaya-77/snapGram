import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/**
 * @method  GET 
 * @routs   ~/api/users/logout
 * @desc    Logout user
 * @access  private
 */
export async function GET() {
    try {
        (await cookies()).delete("jwtToken")
        return NextResponse.json({ message: "Logout" }, { status: 200 })
    } catch {
        return NextResponse.json({ message: "internal server error" }, { status: 500 })

    }
}