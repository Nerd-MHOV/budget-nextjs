import { TableBody, TableCell, TableRow } from "@mui/material";
import { useContext } from "react";
import { CurrencyFormat } from "../../CurrencyFormat";
import {EditTariffContext} from "@/contexts/editTariff/editTariff";

export const ValuesRowsStep = ({
  type,
}: {
  type: "midweek" | "weekend" | "specific";
}) => {
  const { setUHValue, getValue } = useContext(EditTariffContext);

  return (
    <TableBody>
      <TableRow>
        <TableCell>Padrão</TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValue("PAD")?.adt || 0}
            onValueChange={(value: any) =>
              setUHValue("PAD", "adt", value.floatValue || 0)
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValue("PAD")?.adtex || 0}
            onValueChange={(value: any) =>
              setUHValue("PAD", "adtex", value.floatValue || 0)
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValue("PAD")?.chd0 || 0}
            onValueChange={(value: any) =>
              setUHValue("PAD", "chd0", value.floatValue || 0)
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValue("PAD")?.chd4 || 0}
            onValueChange={(value: any) =>
              setUHValue("PAD", "chd4", value.floatValue || 0)
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValue("PAD")?.chd8 || 0}
            onValueChange={(value: any) =>
              setUHValue("PAD", "chd8", value.floatValue || 0)
            }
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Padrão Varanda</TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValue("PADV")?.adt || 0}
            onValueChange={(value: any) =>
              setUHValue("PADV", "adt", value.floatValue || 0)
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValue("PADV")?.adtex || 0}
            onValueChange={(value: any) =>
              setUHValue("PADV", "adtex", value.floatValue || 0)
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValue("PADV")?.chd0 || 0}
            onValueChange={(value: any) =>
              setUHValue("PADV", "chd0", value.floatValue || 0)
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValue("PADV")?.chd4 || 0}
            onValueChange={(value: any) =>
              setUHValue("PADV", "chd4", value.floatValue || 0)
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValue("PADV")?.chd8 || 0}
            onValueChange={(value: any) =>
              setUHValue("PADV", "chd8", value.floatValue || 0)
            }
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Luxo</TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValue("LUX")?.adt || 0}
            onValueChange={(value: any) =>
              setUHValue("LUX", "adt", value.floatValue || 0)
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValue("LUX")?.adtex || 0}
            onValueChange={(value: any) =>
              setUHValue("LUX", "adtex", value.floatValue || 0)
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValue("LUX")?.chd0 || 0}
            onValueChange={(value: any) =>
              setUHValue("LUX", "chd0", value.floatValue || 0)
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValue("LUX")?.chd4 || 0}
            onValueChange={(value: any) =>
              setUHValue("LUX", "chd4", value.floatValue || 0)
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValue("LUX")?.chd8 || 0}
            onValueChange={(value: any) =>
              setUHValue("LUX", "chd8", value.floatValue || 0)
            }
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Luxo Conjugado</TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValue("LUXC")?.adt || 0}
            onValueChange={(value: any) =>
              setUHValue("LUXC", "adt", value.floatValue || 0)
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValue("LUXC")?.adtex || 0}
            onValueChange={(value: any) =>
              setUHValue("LUXC", "adtex", value.floatValue || 0)
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValue("LUXC")?.chd0 || 0}
            onValueChange={(value: any) =>
              setUHValue("LUXC", "chd0", value.floatValue || 0)
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValue("LUXC")?.chd4 || 0}
            onValueChange={(value: any) =>
              setUHValue("LUXC", "chd4", value.floatValue || 0)
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValue("LUXC")?.chd8 || 0}
            onValueChange={(value: any) =>
              setUHValue("LUXC", "chd8", value.floatValue || 0)
            }
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Luxo c/ Hidro</TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValue("LUXH")?.adt || 0}
            onValueChange={(value: any) =>
              setUHValue("LUXH", "adt", value.floatValue || 0)
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValue("LUXH")?.adtex || 0}
            onValueChange={(value: any) =>
              setUHValue("LUXH", "adtex", value.floatValue || 0)
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValue("LUXH")?.chd0 || 0}
            onValueChange={(value: any) =>
              setUHValue("LUXH", "chd0", value.floatValue || 0)
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValue("LUXH")?.chd4 || 0}
            onValueChange={(value: any) =>
              setUHValue("LUXH", "chd4", value.floatValue || 0)
            }
          />
        </TableCell>
        <TableCell>
          <CurrencyFormat
            value={getValue("LUXH")?.chd8 || 0}
            onValueChange={(value: any) =>
              setUHValue("LUXH", "chd8", value.floatValue || 0)
            }
          />
        </TableCell>
      </TableRow>
    </TableBody>
  );
};
