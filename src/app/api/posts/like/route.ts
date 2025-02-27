import prisma from "../../../../lib/db";
import { NextRequest, NextResponse } from 'next/server';

/**
 * @method  POST 
 * @routs   ~/api/posts/like
 * @desc    like posts
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

        const existingLike = await prisma.like.findFirst({
            where: {
                userId,
                postId,
            },
        });

        if (existingLike) {
            await prisma.like.delete({
                where: {
                    id: existingLike.id,
                },
            });
            return NextResponse.json({ message: "Like removed", likeRemoved: true }, { status: 200 });
        }
        
        const like = await prisma.like.create({
            data: {
                userId,
                postId,
            },
            include: {
                user: true,
                post: true,
            }
        });
        return NextResponse.json(like, { status: 201 });
    } catch (error) { 
        return NextResponse.json({ message: "internal server error" }, { status: 500 })
    }
}


/**
 * @method  GET 
 * @routs   ~/api/post/:id/like
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
            include: { Like: true },
        });

        if (!post) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }

        const initialLikes = post.Like.length;
        const initialLiked = post.Like.some((like) => like.userId === numericUserId);

        return NextResponse.json({ initialLikes, initialLiked }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Internal server error", error: error.message },
            { status: 500 }
        );
    }
}


