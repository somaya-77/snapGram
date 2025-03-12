import prisma from "../../../../lib/db";
import { UpdateComments } from "@/types";
import { verifyToken } from "@/lib/verifyToken";
import { NextRequest, NextResponse } from "next/server";


/**
 * @method  PUT 
 * @routs   ~/api/comments/:id
 * @desc    update comment 
 * @access  private
*/

export async function PUT(request: NextRequest,  {params}:{params: Promise<{ id: string }>}) {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);

    if (!params || !id) {
        return NextResponse.json({ message: "ID parameter is missing" }, { status: 400 });
    }
    try {
        const commentById = await prisma.comments.findUnique({ where: { id} })
        const userFromToken = verifyToken(request);

        if (!commentById) {
            return NextResponse.json({ message: "comment not found!" }, { status: 404 });
        }

        if (userFromToken === null || userFromToken.id !== commentById.userId) {
            return NextResponse.json({ message: "you are not allowed, access denied" }, { status: 403 });
        }

        const body = await request.json() as UpdateComments;

        const comment = await prisma.comments.update({
            where: { id },
            data: {
                text: body.text,
            }
        })

        return NextResponse.json(comment, { status: 200 });
    } catch (error){
        return NextResponse.json({ message: "internal server error" }, { status: 500 })
    }
}



/**
 * @method  DELETE 
 * @routs   ~/api/comments/:id
 * @desc    delete comment 
 * @access  private
 */

export async function DELETE(request: NextRequest,  {params}:{params: Promise<{ id: string }>}) {
    const resolvedParams = await params; 
    const id = parseInt(resolvedParams.id);
    try {
        const comment = await prisma.comments.findUnique({ where: { id } })
        if (!comment) {
            return NextResponse.json({ message: "comment not found!" }, { status: 404 });
        }

        // check same account by token

        const userFromToken = verifyToken(request);

        if (userFromToken === null) {
            return NextResponse.json({ message: "no token provided, access denied" }, { status: 401 });
        }
        if (userFromToken.isAdmin || userFromToken.id === comment.userId) {
            await prisma.comments.delete({ where: { id } })
            return NextResponse.json({ message: "comment deleted" }, { status: 200 });
        }
        return NextResponse.json({ message: "you are not allowed." }, { status: 403 });


    } catch {
        return NextResponse.json({ message: "internal server error" }, { status: 500 })
    }
}

/**
 * @method  GET
 * @route   ~/api/comments/:id
 * @desc    Get comment by ID
 * @access  public 
 */
export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);

    if (!id) {
        return NextResponse.json({ message: "ID parameter is missing" }, { status: 400 });
    }

    try {
        const comment = await prisma.comments.findUnique({
            where: { id },
        });

        if (!comment) {
            return NextResponse.json({ message: "Comment not found!" }, { status: 404 });
        }

        return NextResponse.json(comment, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}