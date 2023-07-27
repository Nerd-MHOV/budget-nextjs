import {verifyRoute} from "@/lib/jwt";
import prisma from "@/lib/prisma";
import {NextResponse} from "next/server";


interface RequestBodyPOST {

}

export async function POST(request: Request) {
    const verifyPermission = verifyRoute(request, true)
    if(verifyPermission) return verifyPermission
    const body = await request.json()
    try {
        const first = body.tariffs[0];
        const second = body.tariffs[1];
        const { id: firstFoodId, tariffs_id: _, ...firstFood } = first.food;
        const earlyWithoutIds = first.TariffCheckInValues.map((value: any) => {
            const { id: idEarly, tariffs_id: _, ...rest } = value;
            return rest;
        });
        const valuesWithoutId = first.TariffValues.map((value: any) => {
            const { id: idValue, tariffs_id: _, ...rest } = value;
            return rest;
        });

        const {
            id: secondFoodId,
            tariffs_id: _secondTariffId,
            ...secondFood
        } = second.food;
        const secondEarlyWithoutIds = second.TariffCheckInValues.map(
            (value: any) => {
                const { id: idEarly, tariffs_id: _, ...rest } = value;
                return rest;
            }
        );
        const secondValuesWithoutId = second.TariffValues.map((value: any) => {
            const { id: idValue, tariffs_id: _, ...rest } = value;
            return rest;
        });
        console.log("HERE", second.food);

        const [firstCreate, secondCreate, commonCreate] =
            await prisma.$transaction([
                prisma.tariff.create({
                    data: {
                        name: first.name,
                        product_pipe: first.product_pipe,
                        active: first.active,
                        food: {
                            connectOrCreate: {
                                where: { id: firstFoodId },
                                create: {
                                    ...firstFood,
                                },
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
                    },
                }),
                prisma.tariff.create({
                    data: {
                        name: second.name,
                        product_pipe: second.product_pipe,
                        active: second.active,
                        food: {
                            connectOrCreate: {
                                where: { id: secondFoodId },
                                create: {
                                    ...secondFood,
                                },
                            },
                        },
                        TariffCheckInValues: {
                            createMany: {
                                data: secondEarlyWithoutIds,
                            },
                        },
                        TariffValues: {
                            createMany: {
                                data: secondValuesWithoutId,
                            },
                        },
                    },
                }),
                prisma.commonDates.createMany({
                    data: first.tariffs_to_midweek,
                }),
            ]);

        console.log("============================================");
        console.log({ firstCreate, secondCreate, commonCreate });
        return NextResponse.json({
            msg: "success",
            debug: { firstCreate, secondCreate, commonCreate },
        });
    } catch (err) {
        console.log("============================================");
        console.log(err);
        console.log("============================================");

        return NextResponse.json({ msg: "error", debug: err });
    }
}

export async function GET(request: Request) {
    const verifyPermission = verifyRoute(request)
    if(verifyPermission) return verifyPermission
    const commonDates = prisma.commonDates.findMany()
    return NextResponse.json(commonDates)
}