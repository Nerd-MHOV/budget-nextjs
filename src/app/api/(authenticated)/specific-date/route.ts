import {verifyRoute} from "@/lib/jwt";
import prisma from "@/lib/prisma";
import {NextResponse} from "next/server";


export async function POST(request: Request) {
    const verifyPermission = verifyRoute(request, true)
    if(verifyPermission) return verifyPermission
    const body = await request.json()
    try {
        const tariff = body.tariffs[0];
        const { id: foodId, tariffs_id: _tariffs, ...food } = tariff.food;
        const earlyWithoutIds = tariff.TariffCheckInValues.map((value: any) => {
            const { id: _, tariffs_id: _tariffs, ...rest } = value;
            return rest;
        });
        const valuesWithoutId = tariff.TariffValues.map((value: any) => {
            const { id: _, tariffs_id: _tariffs, ...rest } = value;
            return rest;
        });
        const specificWithoutTariffs = tariff.SpecificDates.map((value: any) => {
            const { tariffs_id: _, ...rest } = value;
            return rest;
        });
        const specificCreate = await prisma.tariff.create({
            data: {
                name: tariff.name,
                product_pipe: tariff.product_pipe,
                active: tariff.active,
                food: {
                    connectOrCreate: {
                        where: { id: foodId },
                        create: food,
                    },
                },
                TariffCheckInValues: {
                    createMany: {
                        data: earlyWithoutIds,
                    },
                },
                TariffValues: {
                    createMany: {
                        data: valuesWithoutId,
                    },
                },
                SpecificDates: {
                    createMany: {
                        data: specificWithoutTariffs,
                    },
                },
            },
        });
        return NextResponse.json({ msg: "success", debug: specificCreate });
    } catch (err) {
        console.log(err);

        return NextResponse.json({ msg: "error", debug: err });
    }

}

export async function GET(request: Request) {
    const verifyPermission = verifyRoute(request)
    if(verifyPermission) return verifyPermission
    const specificDate = await prisma.specificDates.findMany()
    return NextResponse.json(specificDate)
}
