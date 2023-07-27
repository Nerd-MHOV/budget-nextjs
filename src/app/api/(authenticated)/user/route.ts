import prisma from "@/lib/prisma";

import * as bcrypt from "bcrypt";
import {verifyJwt, verifyRoute} from "@/lib/jwt";
import {NextResponse} from "next/server";

interface RequestBodyPOST {
  name: string;
  email: string;
  password: string;
  phone: string;
  username: string;
  token_pipe: string;
  user_pipe: string;
}

export async function POST(request: Request) {
  const isVerified = verifyRoute(request, true)
  if(isVerified) return isVerified;

  const body: RequestBodyPOST = await request.json();


  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: await bcrypt.hash(body.password, 10),
      phone: body.phone,
      username: body.username,
      token_pipe: body.token_pipe,
      user_pipe: body.user_pipe
    },
  });

  const { password, ...result } = user;

  return NextResponse.json(result);
}


export async function GET(request: Request) {
  const isVerified = verifyRoute(request)
  if(isVerified) return isVerified;

  const user = await prisma.user.findMany();
  return NextResponse.json(user)
}



