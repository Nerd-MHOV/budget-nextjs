import {verifyRoute} from "@/lib/jwt";
import {NextResponse} from "next/server";
import prisma from "@/lib/prisma";


interface RequestBodyPOST {
    id: string,
    name: string,
}

export async function POST(request: Request) {
    const verifyPermission = verifyRoute(request, true)
    if(verifyPermission) return verifyPermission

    const body: RequestBodyPOST = await request.json()

    const category = await prisma.categories.create({data: body})
    return NextResponse.json(category);
}

export async function GET(request: Request) {
    const verifyPermission = verifyRoute(request)
    if(verifyPermission) return verifyPermission
    const categories = await prisma.categories.findMany()
    return NextResponse.json(categories)
}