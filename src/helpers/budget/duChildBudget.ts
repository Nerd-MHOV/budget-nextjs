import { duGenerateBudget } from "./duGenerateBudget";
import {BudgetForm, BudgetRows} from "@/entity/budget";

export async function duChildBudget(
  arrChild: number[],
  arrForm: BudgetForm,
  initDate: Date
) {
  let amountAdults = arrForm.adult ?? 0;
  let amountChild = arrChild.length;
  let childRows: BudgetRows[] = [];
  let courtesies = Math.floor(amountAdults / 2);

  arrChild.sort((a, b) => a - b);
  for (let countChild = 0; countChild < arrChild.length; countChild++) {
    const numChild = countChild + 1;
    let valuesChild: number[] = [];
    let totalChild = 0;
    let uChild = Number(arrChild[countChild]);

    if (uChild <= 5 && courtesies > 0) {
      courtesies--;
      valuesChild = await duGenerateBudget(initDate, arrForm, "chd0");
    } else valuesChild = await duGenerateBudget(initDate, arrForm, "chd6");

    for (let i = 0; i < valuesChild.length; i++) {
      totalChild += valuesChild[i];
    }

    childRows.push({
      id: 200 + numChild,
      desc: "CHD " + numChild,
      values: valuesChild,
      total: totalChild,
      noDiscount: valuesChild,
      totalNoDiscount: totalChild,
      discountApplied: 0,
    });
  }

  return childRows;
}
