import { TableBody, TableCell, TableRow } from "@mui/material";
import { useContext } from "react";
import { CurrencyFormat } from "../../CurrencyFormat";
import {CreateTariffContext} from "@/contexts/createTariff/createTariff";

export const ValuesRowsStep = ({
  type,
}: {
  type: "midweek" | "weekend" | "specific";
}) => {
  const { setUHValues, getValues, arrTariffs } =
    useContext(CreateTariffContext);

  const log = () => {
    console.log(arrTariffs);
  };
  return (
      <TableBody>
        <TableRow>
          <TableCell onClick={log}>Padrão</TableCell>
          <TableCell>
            <CurrencyFormat
                value={getValues(type).UHsValues.PAD.adt}
                onValueChange={(value: { floatValue: any; }) =>
                    setUHValues(type, "adt", "PAD", value.floatValue || 0)
                }
            />
          </TableCell>
          <TableCell>
            <CurrencyFormat
                value={getValues(type).UHsValues.PAD.adtex}
                onValueChange={(value: { floatValue: any; }) =>
                    setUHValues(type, "adtex", "PAD", value.floatValue || 0)
                }
            />
          </TableCell>
          <TableCell>
            <CurrencyFormat
                value={getValues(type).UHsValues.PAD.chd0}
                onValueChange={(value: { floatValue: any; }) =>
                    setUHValues(type, "chd0", "PAD", value.floatValue || 0)
                }
            />
          </TableCell>
          <TableCell>
            <CurrencyFormat
                value={getValues(type).UHsValues.PAD.chd4}
                onValueChange={(value: { floatValue: any; }) =>
                    setUHValues(type, "chd4", "PAD", value.floatValue || 0)
                }
            />
          </TableCell>
          <TableCell>
            <CurrencyFormat
                value={getValues(type).UHsValues.PAD.chd8}
                onValueChange={(value: { floatValue: any; }) =>
                    setUHValues(type, "chd8", "PAD", value.floatValue || 0)
                }
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Padrão Varanda</TableCell>
          <TableCell>
            <CurrencyFormat
                value={getValues(type).UHsValues.PADV.adt}
                onValueChange={(value: { floatValue: any; }) =>
                    setUHValues(type, "adt", "PADV", value.floatValue || 0)
                }
            />
          </TableCell>
          <TableCell>
            <CurrencyFormat
                value={getValues(type).UHsValues.PADV.adtex}
                onValueChange={(value: { floatValue: any; }) =>
                    setUHValues(type, "adtex", "PADV", value.floatValue || 0)
                }
            />
          </TableCell>
          <TableCell>
            <CurrencyFormat
                value={getValues(type).UHsValues.PADV.chd0}
                onValueChange={(value: { floatValue: any; }) =>
                    setUHValues(type, "chd0", "PADV", value.floatValue || 0)
                }
            />
          </TableCell>
          <TableCell>
            <CurrencyFormat
                value={getValues(type).UHsValues.PADV.chd4}
                onValueChange={(value: { floatValue: any; }) =>
                    setUHValues(type, "chd4", "PADV", value.floatValue || 0)
                }
            />
          </TableCell>
          <TableCell>
            <CurrencyFormat
                value={getValues(type).UHsValues.PADV.chd8}
                onValueChange={(value: { floatValue: any; }) =>
                    setUHValues(type, "chd8", "PADV", value.floatValue || 0)
                }
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Luxo</TableCell>
          <TableCell>
            <CurrencyFormat
                value={getValues(type).UHsValues.LUX.adt}
                onValueChange={(value: { floatValue: any; }) =>
                    setUHValues(type, "adt", "LUX", value.floatValue || 0)
                }
            />
          </TableCell>
          <TableCell>
            <CurrencyFormat
                value={getValues(type).UHsValues.LUX.adtex}
                onValueChange={(value: { floatValue: any; }) =>
                    setUHValues(type, "adtex", "LUX", value.floatValue || 0)
                }
            />
          </TableCell>
          <TableCell>
            <CurrencyFormat
                value={getValues(type).UHsValues.LUX.chd0}
                onValueChange={(value: {floatValue: any}) =>
                    setUHValues(type, "chd0", "LUX", value.floatValue || 0)
                }
            />
          </TableCell>
          <TableCell>
            <CurrencyFormat
                value={getValues(type).UHsValues.LUX.chd4}
                onValueChange={(value: {floatValue: any}) =>
                    setUHValues(type, "chd4", "LUX", value.floatValue || 0)
                }
            />
          </TableCell>
          <TableCell>
            <CurrencyFormat
                value={getValues(type).UHsValues.LUX.chd8}
                onValueChange={(value: {floatValue: any}) =>
                    setUHValues(type, "chd8", "LUX", value.floatValue || 0)
                }
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Luxo Conjugado</TableCell>
          <TableCell>
            <CurrencyFormat
                value={getValues(type).UHsValues.LUXC.adt}
                onValueChange={(value: {floatValue: any}) =>
                    setUHValues(type, "adt", "LUXC", value.floatValue || 0)
                }
            />
          </TableCell>
          <TableCell>
            <CurrencyFormat
                value={getValues(type).UHsValues.LUXC.adtex}
                onValueChange={(value: {floatValue: any}) =>
                    setUHValues(type, "adtex", "LUXC", value.floatValue || 0)
                }
            />
          </TableCell>
          <TableCell>
            <CurrencyFormat
                value={getValues(type).UHsValues.LUXC.chd0}
                onValueChange={(value: {floatValue: any}) =>
                    setUHValues(type, "chd0", "LUXC", value.floatValue || 0)
                }
            />
          </TableCell>
          <TableCell>
            <CurrencyFormat
                value={getValues(type).UHsValues.LUXC.chd4}
                onValueChange={(value: {floatValue: any}) =>
                    setUHValues(type, "chd4", "LUXC", value.floatValue || 0)
                }
            />
          </TableCell>
          <TableCell>
            <CurrencyFormat
                value={getValues(type).UHsValues.LUXC.chd8}
                onValueChange={(value: {floatValue: any}) =>
                    setUHValues(type, "chd8", "LUXC", value.floatValue || 0)
                }
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Luxo c/ Hidro</TableCell>
          <TableCell>
            <CurrencyFormat
                value={getValues(type).UHsValues.LUXH.adt}
                onValueChange={(value: {floatValue: any}) =>
                    setUHValues(type, "adt", "LUXH", value.floatValue || 0)
                }
            />
          </TableCell>
          <TableCell>
            <CurrencyFormat
                value={getValues(type).UHsValues.LUXH.adtex}
                onValueChange={(value: {floatValue: any}) =>
                    setUHValues(type, "adtex", "LUXH", value.floatValue || 0)
                }
            />
          </TableCell>
          <TableCell>
            <CurrencyFormat
                value={getValues(type).UHsValues.LUXH.chd0}
                onValueChange={(value: {floatValue: any}) =>
                    setUHValues(type, "chd0", "LUXH", value.floatValue || 0)
                }
            />
          </TableCell>
          <TableCell>
            <CurrencyFormat
                value={getValues(type).UHsValues.LUXH.chd4}
                onValueChange={(value: {floatValue: any}) =>
                    setUHValues(type, "chd4", "LUXH", value.floatValue || 0)
                }
            />
          </TableCell>
          <TableCell>
            <CurrencyFormat
                value={getValues(type).UHsValues.LUXH.chd8}
                onValueChange={(value: {floatValue: any}) =>
                    setUHValues(type, "chd8", "LUXH", value.floatValue || 0)
                }
            />
          </TableCell>
        </TableRow>
      </TableBody>
  );
};
