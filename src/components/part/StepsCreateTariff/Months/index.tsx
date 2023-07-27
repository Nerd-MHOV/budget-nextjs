import { useContext } from "react";
import { CommonMonths } from "./CommonMonth";
import { SpecificMonth } from "./SpecificMonth";
import {CreateTariffContext} from "@/contexts/createTariff/createTariff";

export const MonthsCommon = () => {
  const { typeTariff } = useContext(CreateTariffContext);
  return (
    <div className="months-common">
      {typeTariff === "common" && <CommonMonths />}
      {typeTariff === "specific" && <SpecificMonth />}
    </div>
  );
};
