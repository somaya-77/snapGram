import prisma from "../../../lib/db";
import { IComments } from "@/types";
import { verifyToken } from "@/lib/verifyToken";
import { NextRequest, NextResponse } from "next/server";
import { CommentValidation } from "@/lib/validation";

/**
 * @method  POST 
 * @routs   ~/api/comments
 * @desc    Create new comment 
 * @access  Public
 */

export async function POST(request: NextRequest) {
    try {
        const userFromToken = verifyToken(request);

        if (!userFromToken) {
            return NextResponse.json({ message: "only logged in user, access denied" }, { status: 401 });
        }

        // const user = await prisma.user.findUnique({where: { email: body. },})
        const body = await request.json() as IComments;


        const validation = CommentValidation.safeParse(body);

        if(!validation.success) {
            return NextResponse.json({ message: validation.error.errors[0].message }, { status: 500 })
        }

        const comment = await prisma.comments.create({
            data: {
                text: body.text,
                postId: body.postId,
                userId: userFromToken.id
            },
            include:{
                user: true,
            }
        })

        return NextResponse.json(comment, { status: 201 });
    } catch {
        return NextResponse.json({ message: "internal server error" }, { status: 500 })
    }
}


/**
 * @method  GET 
 * @routs   ~/api/comments
 * @desc    Get All comments 
 * @access  private
 */
export async function GET(request: NextRequest) {
    try {
        const userFromToken = verifyToken(request);
        if(userFromToken === null || userFromToken.isAdmin === false){
            return NextResponse.json({ message: "only admin, access denied" }, { status: 403 })
        }
        const comments = await prisma.comments.findMany();
        return NextResponse.json(comments, { status: 200 });
    } catch {
        return NextResponse.json({ message: "internal server error" }, { status: 500 })

    }
}



