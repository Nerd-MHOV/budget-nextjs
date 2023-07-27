import {verifyRoute} from "@/lib/jwt";
import {addDays, format, isWeekend} from "date-fns";
import {getTariff} from "@/helpers/budget/getTariff";

interface RequestBodyGET {
    date_in: string,
    date_out: string,
}
export async function GET(request: Request) {
    const verifyPermission = verifyRoute(request)
    if(verifyPermission) return verifyPermission
    const body: RequestBodyGET = await request.json();
    let tariff: any = {}
    let dateIn = new Date(body.date_in)
    let dateOut = new Date(body.date_out)
    let type = "";

    if(format(dateIn, "yyyy-MM-dd") === format(dateOut, "yyyy-MM-dd")) {
        tariff = {
            product_pipe: "46"
        }
    }

    while (dateIn < dateOut) {
        let dayMonthYear = format(dateIn, "yyyy-MM-dd");
        let monthYear = format(dateIn, "yyyy-MM");
        let tariffs = await getTariff(dayMonthYear, monthYear);

        if (tariffs.type === "specific") {
            tariff = tariffs.tariff_we;
            type = "isHoliday";
        }

        if (isWeekend(dateIn) && type !== "isHoliday") {
            tariff = tariffs.tariff_we;
            type = "isWeekend";
        }
        if (!isWeekend(dateIn) && type !== "isHoliday" && type !== "isWeekend") {
            tariff = tariffs.tariff_mw;
            type = "isCommon";
        }
        dateIn = addDays(dateIn, 1);
    }
}