import {verifyRoute} from "@/lib/jwt";
import prisma from "@/lib/prisma";
import {NextRequest, NextResponse} from "next/server";


interface RequestBodyPOST {
    carrying: string,
    daily_price: number,
}

export async function POST(request: Request) {
    const verifyPermission = verifyRoute(request, true)
    if(verifyPermission) return verifyPermission
    const body: RequestBodyPOST = await request.json()
    const pet = await prisma.pet.create({data:body})
    return NextResponse.json(pet)
}

export async function GET(request: Request) {
    const verifyPermission = verifyRoute(request)
    if(verifyPermission) return verifyPermission
    const pets = await prisma.pet.findMany()
    return NextResponse.json(pets)
}