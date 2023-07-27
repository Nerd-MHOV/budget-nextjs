import {verifyJwt, verifyRoute} from "@/lib/jwt";
import prisma from "@/lib/prisma";
import {NextResponse} from "next/server";
import * as bcrypt from "bcrypt";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const isVerified = verifyRoute(request)
  if(isVerified) return isVerified;

  const user = await prisma.user.findUnique({
    where: { id: params.id },
  });

  return NextResponse.json(user);
}

export async function DELETE(
    request: Request,
    {params} : {params: { id: string }}) {
  const verifyPermission = verifyRoute(request)
  if(verifyPermission) return verifyPermission

  const deleted = await prisma.user.delete({ where: { id: params.id } })

  return NextResponse.json(deleted);
}


interface RequestBodyUPDATE {
  name: string;
  email: string;
  password: string;
  phone: string;
  username: string;
  token_pipe: string;
  user_pipe: string;
}
export async function PATCH(request: Request, {params} : {params: { id: string }}) {
  const isVerified = verifyRoute(request, true)
  if(isVerified) return isVerified;

  const body: Partial<RequestBodyUPDATE> = await request.json();
  if(body.password) body.password = await bcrypt.hash(body.password, 10)


  const updated = await prisma.user.update({
    where: {id: params.id},
    data: body
  })

  return NextResponse.json(updated);
}