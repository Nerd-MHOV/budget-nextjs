import {verifyRoute} from "@/lib/jwt";
import prisma from "@/lib/prisma";
import {NextResponse} from "next/server";


interface RequestBodyPOST {
    tariffs_id: string,
    category_id: string,
    adt: number,
    adtex: number,
    chd0: number,
    chd4: number,
    chd8: number
}

export async function POST(request: Request) {
    const verifyPermission = verifyRoute(request, true)
    if(verifyPermission) return verifyPermission
    const body: RequestBodyPOST = await request.json()
    const tariffValue = await prisma.tariffValues.create({data: body})
    return NextResponse.json(tariffValue)
}

export async function GET(request: Request) {
    const verifyPermission = verifyRoute(request)
    if(verifyPermission) return verifyPermission
    const tariff_values = await prisma.tariffValues.findMany()
    return NextResponse.json(tariff_values)
}