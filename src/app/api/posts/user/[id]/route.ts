import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/db";

export async function GET(_request: NextRequest, {params}:{params: Promise<{ id: string }>}) {
    const resolvedParams = await params; 
    const id = parseInt(resolvedParams.id);
    try {
        
        if (isNaN(id)) {
            return NextResponse.json({ message: "Invalid user ID!" }, { status: 400 });
        }
        
        const posts = await prisma.post.findMany({
            where: { id }, 
            include: {
                // user: true,
                // Save: true,
                // Like: true,
                // tags: true,
                // comment: {
                //     include: {
                //         user: {
                //             select: {
                //                 username: true,
                //                 name: true,
                //             }
                //         },
                //     },
                //     orderBy: {
                //         createdAt: 'desc',
                //     }
                // }
            },
            orderBy: {
                createdAt: 'desc', 
            }
        });

        if (!posts.length) {
            return NextResponse.json({ message: "No posts found for this user!" }, { status: 404 });
        }

        return NextResponse.json(posts, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal server error", error: error }, { status: 500 });
    }
}
