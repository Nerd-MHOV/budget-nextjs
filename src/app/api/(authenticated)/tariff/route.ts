import {verifyRoute} from "@/lib/jwt";
import prisma from "@/lib/prisma";
import {NextResponse} from "next/server";


interface RequestBodyPOST {
    name: string,
    product_pipe: string,
    food_id: number,
    active?: boolean
}

export async function POST(request: Request) {
    const verifyPermission = verifyRoute(request, true)
    if(verifyPermission) return verifyPermission
    const body: RequestBodyPOST = await request.json()
    const tariff = await prisma.tariff.create({data: body})
    return NextResponse.json(tariff)
}

export async function GET(request: Request) {
    const verifyPermission = verifyRoute(request)
    if(verifyPermission) return verifyPermission
    const tariffs = await prisma.tariff.findMany()
    return NextResponse.json(tariffs)
}