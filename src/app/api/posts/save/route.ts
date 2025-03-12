import prisma from "../../../../lib/db";
import { NextRequest, NextResponse } from 'next/server';

/**
 * @method  POST 
 * @routs   ~/api/posts/save
 * @desc    save posts
 * @access  public
 */

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {userId, postId} = body;

        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        
        const post = await prisma.post.findUnique({ where: { id: postId } });
        if (!post) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }

        const existingSave = await prisma.save.findFirst({
            where: {
                userId,
                postId,
            },
        });

        if (existingSave) {
            await prisma.save.delete({
                where: {
                    id: existingSave.id,
                },
            });
            return NextResponse.json({ message: "Save removed", saveRemoved: true }, { status: 200 });
        }
        
        const save = await prisma.save.create({
            data: {
                userId,
                postId,
            },
            include: {
                user: true,
                post: true,
            }
        });
        
        return NextResponse.json(save, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "internal server error" }, { status: 500 })
    }
}


/**
 * @method  GET 
 * @routs   ~/api/post/:id/save
 * @desc    Get single post 
 * @access  public
 */


export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const postId = searchParams.get("postId");
        const userId = searchParams.get("userId");

        if (!postId || !userId) {
            return NextResponse.json({ message: "Missing parameters" }, { status: 400 });
        }

        const numericPostId = parseInt(postId);
        const numericUserId = parseInt(userId);

        if (isNaN(numericPostId) || isNaN(numericUserId)) {
            return NextResponse.json({ message: "Invalid parameters" }, { status: 400 });
        }

        const post = await prisma.post.findUnique({
            where: { id: numericPostId },
            include: { Save: true },
        });

        if (!post) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }

        const initialSaves = post.Save.length;
        const initialSaved = post.Save.some((like) => like.userId === numericUserId);

        return NextResponse.json({ initialSaves, initialSaved }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { message: "Internal server error", error: error.message },
            { status: 500 }
        );
    }
}


