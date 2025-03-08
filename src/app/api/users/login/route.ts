import bcrypt from 'bcrypt';
import prisma from "../../../../lib/db";
import { ILoginUser } from "@/types";
import { setCookie } from "@/lib/token";
import { LoginValidation } from "@/lib/validation";
import { NextRequest, NextResponse } from "next/server";
import Cors from 'cors';

const cors = Cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    origin: 'https://snap-gram-git-main-somayas-projects-92eaebb0.vercel.app', // النطاق المسموح له
  });
  
  function runCors(req: NextRequest, res: NextResponse, next: Function) {
    cors(req, res, (result) => {
      if (result instanceof Error) {
        return res.status(500).json({ message: 'CORS Error' });
      }
      next();
    });
  }
  

/**
 * @method  POST 
 * @routs   ~/api/users/login
 * @desc    auth user 
 * @access  public
 */

export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as ILoginUser;
        const validation = LoginValidation.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({ message: validation.error.errors[0].message }, { status: 400 });
        }

        // check if user is registered
        const user = await prisma.user.findUnique({ where: { email: body.email } });
        if (!user) {
            return NextResponse.json({ message: "please make an account, you do not have an account" }, { status: 400 });
        }

        // login
        const passwordChecked = await bcrypt.compare(body.password, user.password);
        if (!passwordChecked) {
            return NextResponse.json({ message: "please make an account, you do not have an account" }, { status: 400 });
        }

        const cookie = setCookie({
            id: user.id,
            name: user.name,
            username: user.username,
            isAdmin: user.isAdmin
        });

        return NextResponse.json({ message: "Authenticated" }, { status: 200, headers: { "Set-Cookie": cookie } });
    } catch (error) {
        console.error("🔥 Server error:", error);
        return NextResponse.json({ message: "internal server error" }, { status: 500 });
    }

}