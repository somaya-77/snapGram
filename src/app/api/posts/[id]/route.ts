
import prisma from "../../../../lib/db";
import { NextRequest, NextResponse } from "next/server";


/**
 * @method  GET 
 * @routs   ~/api/post/:id
 * @desc    Get single post 
 * @access  public
 */

export async function GET(_request: NextRequest,{params}:{params: Promise<{ id: string }>}) {
    const resolvedParams = await params; 
    const id = parseInt(resolvedParams.id);
    try {
        const post = await prisma.post.findUnique({ where: { id },  
        include: {
            user: true,
            Save: true,
            Like: true,
            tags: true,
            comment: {
                include:{
                    user: {
                        select:{
                            username: true,
                            name: true,
                        }
                    },
                },
                orderBy: {
                    createdAt: 'desc',
                }
            }
        }})
    
        if (!post) {
            return NextResponse.json({ message: "post not found!" }, { status: 404 });
        }
        return NextResponse.json(post, { status: 200 });
    } catch {
        return NextResponse.json({ message: "internal server error" }, { status: 500 })
    }
}

/**
 * @method  PUT 
 * @routs   ~/api/post/:id
 * @desc    update a post 
 * @access  public
 */
// export async function PUT(request: NextRequest, { params }:{ params: { id: string } }) {
//     try {
//         const post = await prisma.post.findUnique({ where: { id: parseInt(params.id) } })
//         if (!post) {
//             return NextResponse.json({ message: "post not found!" }, { status: 404 });
//         }

//         const body = (await request.json()) as Post;
        
//         const updatedPost = await prisma.post.update({
//             where: { id: parseInt(params.id) },
//             data: {
//                 caption: body.caption,
//                 imageUrl: body.imageUrl ? body.imageUrl.toString() : null,
//                 location: body.location,
//                 tags: {
//                     connectOrCreate: body.tags?.map((name: string) => ({
//                         where: { name },
//                         create: { name },
//                     })),
//                 },
//             },
//             include: {
//                 tags: true,
//             },
//         })
//         return NextResponse.json(updatedPost, { status: 200 });
//     } catch {
//         return NextResponse.json({ message: "internal server error" }, { status: 500 })
//     }
// }

/**
 * @method  PUT 
 * @routs   ~/api/post/:id
 * @desc    Update a post 
 * @access  Public
 */
export async function PUT(request: NextRequest, {params}:{params: Promise<{ id: string }>}) {
    const resolvedParams = await params; 
    const id = parseInt(resolvedParams.id);
    try {
    
        if (isNaN(id)) {
            return NextResponse.json({ message: "Invalid post ID" }, { status: 400 });
        }

        let body;
        try {
            body = await request.json();
        } catch (error) {
            return NextResponse.json({ message: "Invalid JSON format" }, { status: 400 });
        }

        if (!body || !body.caption) {
            return NextResponse.json({ message: "Caption is required" }, { status: 400 });
        }

        const post = await prisma.post.findUnique({ where: { id } });
        if (!post) {
            return NextResponse.json({ message: "Post not found!" }, { status: 404 });
        }

        const updatedPost = await prisma.post.update({
            where: { id },
            data: {
                caption: body.caption,
                imageUrl: body.imageUrl ? body.imageUrl.toString() : null,
                location: body.location,
                tags: {
                    connectOrCreate: Array.isArray(body.tags)
                        ? body.tags.map((name: string) => ({
                            where: { name },
                            create: { name },
                        }))
                        : [],
                },
            },
            include: { tags: true },
        });

        return NextResponse.json(updatedPost, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}


/**
 * @method  DELETE 
 * @routs   ~/api/post/:id
 * @desc    Delete a post 
 * @access  public
 */

export async function DELETE(_request: NextRequest,{params}:{params: Promise<{ id: string }>}) {
    const resolvedParams = await params; 
    const id = parseInt(resolvedParams.id);
    try{
        const post = await prisma.post.findUnique({ where: { id }, include: {comment: true} })
    if (!post) {
        return NextResponse.json({ message: "post not found!" }, { status: 404 });
    }
    // deleting the post
    await prisma.post.delete({ where: { id } })

    // deleting all comments that belong to this post
    const commentIds: number[] = post?.comment.map(item => item.id);

    await prisma.comments.deleteMany({
        where: {id: {in: commentIds}}
    })

    return NextResponse.json({ message: "post deleted" }, { status: 200 });
    }catch {
        return NextResponse.json({ message: "internal server error" }, { status: 500 })
    }
}