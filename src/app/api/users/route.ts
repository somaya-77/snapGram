
import jwt from "jsonwebtoken";
import prisma from "../../../lib/db";
import { NextRequest, NextResponse } from "next/server";

/**
 * @method  GET
 * @route   ~/api/users
 * @desc    Get all users
 * @access  Private (only authenticated users)
 */

export async function GET(request: NextRequest) {
    try {
        const jwtToken = request.cookies.get("jwtToken")?.value;
        if (!jwtToken) {
            return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
        }

        const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET as string);
        if (!decoded) {
            return NextResponse.json({ message: "Invalid token" }, { status: 401 });
        }

        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                username: true,
                email: true,
                createdAt: true,
                imageUrl: true,
                Post: {
                    include: {
                        Like: true,
                        Save: true,
                    },
                },

            },
        });

        return NextResponse.json(users, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: "Error retrieving users", error: error.message }, { status: 500 });
    }
}
