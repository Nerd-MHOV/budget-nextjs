import { generateBudgetPet } from "./generateBudgetPet";
import {BudgetForm, BudgetRows, BudgetUnitaryDiscount, PetSize} from "@/entity/budget";

export async function petBudget(
  arrForm: BudgetForm,
  arrPet: PetSize[],
  unitaryDiscount: BudgetUnitaryDiscount[],
  initDate: Date,
  finalDate: Date
) {
  let petRows: BudgetRows[] = [];

  for (let countPet = 0; countPet < arrPet.length; countPet++) {
    const numPet = countPet + 1;
    let valuesPet: number[] = [];
    let totalPet = 0;
    let totalNoDiscount = 0;
    let uPet = arrPet[countPet];
    let discount = 0;
    const id = 300 + numPet;
    const desc = "PET " + uPet;

    valuesPet = await generateBudgetPet(initDate, finalDate, arrForm, uPet);

    //verify unitary discount
    unitaryDiscount.map((unit) => {
      if (unit.id === id && unit.name === desc) {
        discount = unit.discount / 100;
      }
    });

    const valueWithDiscountPet = valuesPet.map((value) => {
      totalNoDiscount += value;
      let resultDiscount = value * discount;
      let result = Math.round(value - resultDiscount);
      totalPet += result;

      return result;
    });
    petRows.push({
      id,
      desc,
      values: valueWithDiscountPet,
      total: totalPet,
      noDiscount: valuesPet,
      totalNoDiscount: totalNoDiscount,
      discountApplied: discount * 100,
    });
  }

  return petRows;
}
