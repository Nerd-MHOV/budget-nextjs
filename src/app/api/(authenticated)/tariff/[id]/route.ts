import {verifyRoute} from "@/lib/jwt";
import prisma from "@/lib/prisma";
import {NextResponse} from "next/server";

interface RequestBodyPATCH {
    name: string,
    product_pipe: string,
    food_id: number,
    active: boolean
    order_id: number,
}
export async function DELETE(request: Request, {params}: {params: {id: string}}){
    const verifyPermission = verifyRoute(request, true)
    if(verifyPermission) return verifyPermission
    const tariff = await prisma.tariff.delete({where:{name: params.id}})
    return NextResponse.json(tariff);
}

export async function PATCH(request: Request, {params}: {params: {id: string}}) {
    const verifyPermission = verifyRoute(request, true)
    if(verifyPermission) return verifyPermission
    const body: RequestBodyPATCH = await request.json()
    const tariff = await prisma.tariff.update({where: {name: params.id}, data: body})
    return NextResponse.json(tariff)
}