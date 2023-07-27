import {Foods, TariffCheckInValues, TariffValues} from "@prisma/client";
import {verifyRoute} from "@/lib/jwt";
import prisma from "@/lib/prisma";
import {NextResponse} from "next/server";

interface RequestBody {
    product_pipe: string,
    values: TariffValues[],
    checkIn: TariffCheckInValues[],
    food: Foods
}

export async function PUT(request: Request, {params}: {params: {id: string}}) {
    const verifyPermission = verifyRoute(request, true)
    if(verifyPermission) return verifyPermission
    const body:RequestBody = await request.json()
    try {
        for (const val of body.values) {
            const { id: id, ...newValues } = val;
            await prisma.tariffValues.update({
                where: {
                    id: id,
                },
                data: newValues,
            });
        }

        for (const val of body.checkIn) {
            const { id: id, ...newValues } = val;

            await prisma.tariffCheckInValues.update({
                where: {
                    id,
                },
                data: newValues,
            });
        }

        const { id: id, ...newValues } = body.food;
        await prisma.foods.update({
            where: { id },
            data: newValues,
        });

        const tariffUpdate = await prisma.tariff.update({
            where: {
                name: params.id,
            },
            data: {
                product_pipe: body.product_pipe,
            },
            include: {
                food: true,
                TariffValues: true,
                TariffCheckInValues: true,
            },
        });

        return NextResponse.json({
            msg: "success",
            debug: tariffUpdate,
        });
    } catch (err) {
        console.log("============================================");
        console.log(err);
        console.log("============================================");

        return NextResponse.json({ msg: "error", debug: err });
    }
}