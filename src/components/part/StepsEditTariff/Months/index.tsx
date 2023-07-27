import { useContext } from "react";
import { CommonMonths } from "./CommonMonth";
import { SpecificMonth } from "./SpecificMonth";
import {EditTariffContext} from "@/contexts/editTariff/editTariff";

export const MonthsCommon = () => {
  const { getTariffType } = useContext(EditTariffContext);
  const typeTariff = getTariffType();
  console.log("chegou aqui");
  return (
    <div className="months-common">
      {typeTariff !== "specific" && <CommonMonths />}
      {typeTariff === "specific" && <SpecificMonth />}
    </div>
  );
};
