import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import {GenerateTariffContext} from "@/contexts/generateTariff/generateTariff";
import {ApiDiscountProps} from "@/hooks/api/interfaces";
import {getAllowedDiscount} from "@/contexts/generateTariff/functions/getters/getAllowedDiscount";
import {getPayers} from "@/contexts/generateTariff/functions/getters/getPayers";

export const ActionInputForm = () => {
  const { selectionRange, dataTable, setActionSelected, actionSelected } =
    useContext(GenerateTariffContext);
  const [action, setAction] = useState<ApiDiscountProps[]>([]);
  const [select, setSelect] = useState("");

  const getAction = async () => {
    const response = await getAllowedDiscount(
      selectionRange,
      getPayers(dataTable)
    );

    console.log("Actions", response);
    const verifyIfSelected = response.find(
      (el) => el.name === actionSelected?.name
    );

    setAction(response);
  };
  useEffect(() => {
    getAction();
  }, [selectionRange, dataTable]);

  useEffect(() => {
    setSelect(actionSelected?.name ?? "");
  }, [actionSelected]);

  if (action.length === 0) return null;
  return (
    <FormControl fullWidth variant="standard">
      <InputLabel id="applied_in_field">Ação Promocional</InputLabel>
      <Select
        labelId="applied_in_field"
        id="applied_in"
        value={select}
        label="Aplicar em"
        onChange={(e) => {
          setActionSelected(action.find((el) => el.name === e.target.value));
          console.log("mudou");
        }}
      >
        <MenuItem value={""}>Nenhuma</MenuItem>

        {action.map((el, index) => (
          <MenuItem value={el.name} key={index}>{el.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
