import prisma from "../../../../../lib/db";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/verifyToken";
import { User } from "@prisma/client";
import bcrypt from 'bcrypt';


/**
 * @method  DELETE 
 * @routs   ~/api/users/profile/:id
 * @desc    create user 
 * @access  private
 */

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);
    try {

        const user = await prisma.user.findUnique({ where: { id }, include: { comment: true }, })
        if (!user) {
            return NextResponse.json({ message: "user not found!" }, { status: 404 });
        }
        const userFromToken = verifyToken(request);

        if (userFromToken !== null && userFromToken.id === user.id) {
            await prisma.user.delete({ where: { id } })


            // deleting all comments that belong to this post
            const commentIds: number[] = user?.comment?.map(item => item.id);

            await prisma.comments.deleteMany({
                where: { id: { in: commentIds } }
            })

            await prisma.user.delete({ where: { id } });
            return NextResponse.json({ message: "your profile has been deleted" }, { status: 200 });
        }
        return NextResponse.json({ message: "only user himself can delete his profile, forbidden" }, { status: 203 });


    } catch {
        return NextResponse.json({ message: "internal server error" }, { status: 500 })
    }
}


/**
 * @method  GET 
 * @routs   ~/api/users/profile/:id
 * @desc    Get profile 
 * @access  public
 */


export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const id =  parseInt(resolvedParams.id);
    try {
        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                username: true,
                name: true,
                email: true,
                isAdmin: true,
                imageUrl: true,
                bio: true,
                createdAt: true,
                comment: true,
            },
        })
        if (!user) {
            return NextResponse.json({ message: "user not found!" }, { status: 404 });
        }
        return NextResponse.json(user, { status: 200 });

    } catch {
        return NextResponse.json({ message: "internal server error" }, { status: 500 })
    }
}

/**
 * @method  PUT 
 * @routs   ~/api/users/profile/:id
 * @desc    update profile 
 * @access  public
 */


export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }>}) {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);
    try {
        const user = await prisma.user.findUnique({
            where: { id }
        })

        if (!user) {
            return NextResponse.json({ message: "user not found!" }, { status: 404 });
        }

        // check same account by token
        const userFromToken = verifyToken(request);

        if (userFromToken === null || userFromToken.id !== user.id) {
            return NextResponse.json({ message: "your are not allowed, access denied" }, { status: 403 });
        }

        const body = await request.json() as User;
        if (body.password) {
            if (body.password.length < 6) {
                return NextResponse.json({ message: "Password should be minium 8 characters" }, { status: 400 });
            }
            const salt = await bcrypt.genSalt(10);
            body.password = await bcrypt.hash(body.password, salt);
        }
        const updateUser = await prisma.user.update({
            where: { id },
            data: {
                id: body.id,
                username: body.username,
                name: body.name,
                email: body.email,
                isAdmin: body.isAdmin,
                imageUrl: body.imageUrl,
                bio: body.bio,
                password: body.password,
            }
        });
        const { password, ...others } = updateUser;

        return NextResponse.json({ ...others }, { status: 200 });
    } catch {
        return NextResponse.json({ message: "internal server error" }, { status: 500 })
    }
}