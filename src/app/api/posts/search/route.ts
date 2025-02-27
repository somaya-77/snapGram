import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/db";


/**
 * @method  GET 
 * @routs   ~/api/post/search?searchText=value
 * @desc    search posts 
 * @access  public
 */


export async function GET(request: NextRequest) {
    try {
        const searchText = request.nextUrl.searchParams.get("searchText");
        let posts;

        if (searchText) {
            posts = await prisma.post.findMany({
                where: {caption: {contains: searchText, mode: "insensitive"}}
            })
        }else{
            posts = await prisma.post.findMany({take: 6})
        }
        return NextResponse.json(posts, { status: 200 });
    } catch {
        return NextResponse.json({ message: "internal server error" }, { status: 500 })
    }
}