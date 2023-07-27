import { Autocomplete, TextField } from "@mui/material";
import { useContext } from "react";
import {GenerateTariffContext} from "@/contexts/generateTariff/generateTariff";
import {PensionsOptionsProps} from "@/contexts/generateTariff/interfaces";

export const PensionInputForm = () => {
  const { disabledPension, setPensionValue, pensionValue } = useContext(
    GenerateTariffContext
  );
  return (
    <Autocomplete
      disabled={disabledPension}
      options={["simples", "meia", "completa"]}
      className="textField"
      onChange={(_, newValue) => {
        setPensionValue(newValue as PensionsOptionsProps | null);
      }}
      value={pensionValue}
      renderInput={(params) => (
        <TextField
          {...params}
          name="pension"
          label="Pensão"
          type="text"
          variant="standard"
        />
      )}
    />
  );
};
