import {verifyRoute} from "@/lib/jwt";
import prisma from "@/lib/prisma";
import {NextResponse} from "next/server";


interface RequestBodyPOST {
    adt: number,
    adtex: number,
    chd0: number,
    chd4: number,
    chd8: number,
}

export async function POST(request: Request) {
    const verifyPermission = verifyRoute(request, true)
    if(verifyPermission) return verifyPermission
    const body: RequestBodyPOST = await request.json()

    const food = await prisma.foods.create({
        data: body
    })

    return NextResponse.json(food);


}

export async function GET(request: Request) {
    const verifyPermission = verifyRoute(request)
    if(verifyPermission) return verifyPermission
    const foods = await prisma.foods.findMany();
    return NextResponse.json(foods);
}