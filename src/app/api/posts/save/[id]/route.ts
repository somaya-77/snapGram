import prisma from "../../../../../lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function GET(_request: NextRequest, {params}:{params: Promise<{ id: string }>}) {
    const resolvedParams = await params; 
    const id = parseInt(resolvedParams.id);
    try {
        
        if (!id) {
            return NextResponse.json({ message: "Invalid user ID!" }, { status: 400 });
        }

        const savedPosts = await prisma.save.findMany({
            where: {
                userId: id, 
            },
            include: {
                user: {  
                    select: { id: true, name: true, username: true }
                },
                post: {  
                    include: {
                        user: { select: { id: true, name: true, username: true } }, 
                        tags: true,
                        comment: {
                            include: {
                                user: { select: { username: true, name: true } }
                            },
                            orderBy: { createdAt: 'desc' }
                        }
                    }
                }
            }
        });

        if (!savedPosts.length) {
            return NextResponse.json({ message: "No liked posts found for this user!" }, { status: 404 });
        }

        const formattedPosts = savedPosts.map(save => ({
            ...save.post,
            savedBy: { 
                id: save.user.id,
                name: save.user.name,
                username: save.user.username,
            }
        }));

        return NextResponse.json(formattedPosts, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 });
    }
}
