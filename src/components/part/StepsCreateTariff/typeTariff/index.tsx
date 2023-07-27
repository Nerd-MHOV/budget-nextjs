import { useContext } from "react";
import "./style.scss";
import {CreateTariffContext} from "@/contexts/createTariff/createTariff";
import Btn from "@/components/layout/Btn/Btn";

export const TypeTariff = () => {
  const { setTypeTariff, typeTariff } = useContext(CreateTariffContext);

  return (
    <div className="type-tariff">
      <Btn
        action="Tarifário Comum"
        color={typeTariff === "common" ? "blue" : ""}
        onClick={() => setTypeTariff("common")}
      />
      <Btn
        action="Data Especifica"
        color={typeTariff === "specific" ? "blue" : ""}
        onClick={() => setTypeTariff("specific")}
      />
    </div>
  );
};
