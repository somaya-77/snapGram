import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { INewUser } from "@/types";
import prisma from "../../../../lib/db";
import { setCookie } from "@/lib/token";
import { NextRequest, NextResponse } from "next/server";
import { RegisterValidation } from "@/lib/validation";

/**
 * @method  POST 
 * @routs   ~/api/users/register
 * @desc    create user 
 * @access  public
 */

export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as INewUser;
        const validation = RegisterValidation.safeParse(body);
        console.log('Finding user:', body.email);
        if (!validation.success) {
            return NextResponse.json({ message: validation.error.errors[0].message }, { status: 400 });
        }
        console.log('Request Body:', body);

        // check if user is registered
        const user = await prisma.user.findUnique({ where: { email: body.email } });
        console.log('User found:', user);
        if (user) {
            return NextResponse.json({ message: "this user already registered" }, { status: 400 });
        }
        // create new user
        const salt = await bcrypt.genSalt(10);
        const hash = bcrypt.hashSync(body.password, salt);
        const newUser = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                username: body.username,
                password: hash,
                isAdmin: true, 
                imageUrl: body.imageUrl || '',

            },
            select: {
                id: true,
                name: true,
                username: true,
                isAdmin: true,
                imageUrl: true,
            }
        });

        const cookie = setCookie({
            id: newUser.id,
            name: newUser.name,
            username: newUser.username,
            isAdmin: newUser.isAdmin
        });

        
        return NextResponse.json({
            message: "Registered & Authenticated",
            token: cookie,
            user: {
                id: newUser.id,
                name: newUser.name,
                username: newUser.username,
                isAdmin: newUser.isAdmin,
                imageUrl: newUser.imageUrl,
            }
        }, { status: 201,  headers: { 
            "Set-Cookie": `${cookie}; SameSite=None; Secure` 
        }  });


    } catch (error){
        console.error("Error during registration:", error);
        return NextResponse.json({ message: "internal server error", error: error.message}, { status: 500 });
    }

}


// ~/pages/api/users/me.ts



export async function GET(request: NextRequest) {
    try {
        const jwtToken = request.cookies.get('jwtToken')?.value as string;

        if (!jwtToken) {
            return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
        }

        const user = jwt.verify(jwtToken, process.env.JWT_SECRET as string);

        return NextResponse.json(user, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: "Invalid token", error: error.message }, { status: 400 });
    }
}
