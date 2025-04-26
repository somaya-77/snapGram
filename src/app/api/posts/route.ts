import prisma from "../../../lib/db";
import { Post } from '@prisma/client';
import { INewPost } from "@/types";
import { verifyToken } from "@/lib/verifyToken";
import { NextRequest, NextResponse } from "next/server";
import { PostFormValidation } from "@/lib/validation";




/**
 * @method  GET 
 * @routs   ~/api/posts
 * @desc    Get All Posts 
 * @access  public
 */

export async function GET() {
    try {
        const posts = await prisma.post.findMany({
            include: {
                tags: true,
                user: true,
                Like: true,
                Save: true,
                comment: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return NextResponse.json(posts, { status: 200 });
    } catch {
        return NextResponse.json({ message: "internal server error" }, { status: 500 })
    }
}

/**
 * @method  POST 
 * @routs   ~/api/posts
 * @desc    Create new post 
 * @access  public
 */

export async function POST(request: NextRequest) {
    try {
        const userFromToken = verifyToken(request); // Get user from token
        if (!userFromToken) {
            return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
        }


        const body: INewPost = await request.json();
        const validation = PostFormValidation.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({ message: validation.error.errors[0].message }, { status: 400 });
        }

        // const imageUrlString = body.imageUrl.toString() || "";
        // const tagsArray = Array.isArray(body.tags)
        // ? body.tags
        // : typeof body.tags === "string" && body?.tags?.trim().length > 0
        // ? body.tags.split(" ")
        // : [];

        const { imageUrl, tags="" } = validation.data; 
        const imageUrlString = imageUrl?.toString() || "";
        const tagsArray = Array.isArray(tags) ? tags : typeof tags === "string" ? tags.split(" ") : [];
        const newPost: Post = await prisma.post.create({
            data: {
                caption: body.caption,
                location: body.location,
                imageUrl: imageUrlString,
                userId: userFromToken.id, 
                tags: {
                    connectOrCreate: tagsArray?.map((name: string) => ({
                        where: { name },
                        create: { name },
                    })),
                },
            },
            include: {
                tags: true,
            },
        })
        return NextResponse.json({
            post: newPost,
            user: {
                id: userFromToken.id,
                name: userFromToken.name,
                username: userFromToken.username,
                isAdmin: userFromToken.isAdmin,
            },
        }, { status: 201 });
    } catch {
        return NextResponse.json({ message: "internal server error" }, { status: 500 })
    }
}
