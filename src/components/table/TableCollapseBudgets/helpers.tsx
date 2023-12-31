import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Star, StarOutline, StartOutlined } from "@mui/icons-material";
import {
  CategoryOptionsProps,
  PensionsOptionsProps,
  RowsProps,
  SelectionRangeProps
} from "@/contexts/generateTariff/interfaces";
import {useApi} from "@/hooks/api/api";
import {usePipe} from "@/hooks/pipedrive/pipeApi";
import {useSession} from "next-auth/react";
import pdfDescription from "@/contexts/generateTariff/functions/pdfDescription";
import pdfBudget from "@/contexts/generateTariff/functions/pdfBudget";
import Btn from "@/components/layout/Btn/Btn";

export const head = ["Data", "User", "Pipe", "UHs", "TOTAL", "favoritos"];

export function convertForReal(number?: number) {
  if (typeof number !== "number") {
    return number;
  }
  return `R$ ${number.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export interface BudgetsProps {
  date: Date;
  product_pipe?: string | number;
  budgets: BudgetsContentProps[];
  total: number;
  id: string;
  user: string;
  uhs: number;
  favorites: BudgetsFavoritesProps[];
}

export interface BudgetsFavoritesProps {
  id: string;
  budget_id: string;
  user_id: string;
}

export interface BudgetsContentProps {
  rows: RowsProps[];
  columns: string[] | [];
  arrComplete: BudgetsArrCompleteProps;
  total: {
    total: number;
    noDiscount: number;
  };
}

export interface BudgetsArrCompleteProps {
  petValue: string[];
  childValue: number[];
  responseForm: BudgetsResponseFormProps;
  selectionRange: SelectionRangeProps;
}

export interface BudgetsResponseFormProps {
  adult: string | number;
  pension: PensionsOptionsProps;
  category: CategoryOptionsProps;
  discount?: string | number;
  numberPipe?: string | number;
  housingUnit: string;
}

export function createData({
  date,
  product_pipe,
  budgets,
  total,
  id,
  user,
  uhs,
  favorites,
}: BudgetsProps) {
  return {
    date,
    product_pipe,
    total,
    id,
    user,
    budgets,
    uhs,
    favorites,
  };
}

export function Row(props: {
  row: ReturnType<typeof createData>;
  ButtonsOn: boolean;
  reloadRows: VoidFunction;
}) {
  const api = useApi();
  const { row, ButtonsOn, reloadRows } = props;
  const [open, setOpen] = React.useState(false);
  const [openUH, setOpenUH] = React.useState(false);
  const pipe = usePipe();
  const {data: session} = useSession();

  async function generatePdfDescription(budgets: BudgetsContentProps[]) {

    const arrUser = await api.findUniqueUser(session?.user.id!);
    const deal_id = budgets[0].arrComplete.responseForm?.numberPipe;
    let name: string;
    name = "";
    if (deal_id !== undefined && +deal_id > 0)
      pipe
        .getaDeal(arrUser.token_pipe, +deal_id)
        .then((response) => {
          name = response?.data?.person_name || "";
        })
        .finally(() => {
          pdfDescription(budgets, arrUser.token_pipe, name);
        });
    else pdfDescription(budgets, arrUser.token_pipe, name);
  }

  async function generatePdfBudget(budgets: BudgetsContentProps[]) {
    if (budgets.length < 1) {
      return;
    }
    const arrUser = await api.findUniqueUser(session?.user.id!);
    pdfBudget(
      budgets,
      arrUser.name,
      arrUser.email,
      arrUser.phone,
      arrUser.token_pipe
    );
  }

  async function handleFavorite(id: string) {
    api.favoriteBudget(id).then((response) => {
      reloadRows();
      console.log("CHAMOU");
    });
  }

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {format(row.date, "dd/MM/yy HH:mm", { locale: ptBR })}
        </TableCell>
        <TableCell>{row.user}</TableCell>
        <TableCell>{row.product_pipe}</TableCell>
        <TableCell>{row.uhs}</TableCell>
        <TableCell>{convertForReal(row.total)}</TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => handleFavorite(row.id)}
          >
            {row.favorites.find(
              (favorite) => favorite.user_id === session?.user.id!
            ) ? (
              <Star />
            ) : (
              <StarOutline />
            )}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <>
              {row.budgets.map((bud, index) => {
                let totalDay: number[] = [];
                return (
                  <Box sx={{ margin: 1 }} key={index}>
                    <Box display="flex" alignItems="center">
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpenUH(!openUH)}
                      >
                        {openUH ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>
                      <Typography variant="body2" gutterBottom component="div">
                        {bud.arrComplete.responseForm?.housingUnit} -{" "}
                        {convertForReal(bud.total.total)}
                      </Typography>
                    </Box>

                    <Collapse in={openUH} timeout="auto" unmountOnExit>
                      <Box>
                        <Table size="small" aria-label="purchases">
                          <TableHead>
                            <TableRow>
                              {bud.columns.map((title) => (
                                <TableCell key={title}>{title}</TableCell>
                              ))}
                              <TableCell>Total</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {bud.rows.map((line) => (
                              <TableRow key={line.id}>
                                <TableCell>{line.desc}</TableCell>
                                {line.values.map((value, index) => {
                                  totalDay[index] =
                                    totalDay[index] !== undefined
                                      ? totalDay[index] + value
                                      : value;
                                  return (
                                    <TableCell key={index}>
                                      {convertForReal(value)}
                                    </TableCell>
                                  );
                                })}
                                <TableCell>
                                  {convertForReal(+line.total)}
                                </TableCell>
                              </TableRow>
                            ))}
                            <TableRow>
                              <TableCell>Total</TableCell>
                              {totalDay.map((td, index) => {
                                return (
                                  <TableCell key={index}>{convertForReal(td)}</TableCell>
                                );
                              })}
                              <TableCell>
                                {convertForReal(bud.total.total)}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                        <Box my={1} textAlign="right">
                          <div
                            className="discount"
                            style={{ color: "#d05c45", marginBottom: 5 }}
                          >
                            desconto aplicado:{" "}
                            {convertForReal(
                              +bud.total.total - bud.total.noDiscount
                            )}
                          </div>

                          <Box gap={2} display="flex" justifyContent="right">
                            <Btn
                              action="Memória de cálculo"
                              color="dashboard"
                              onClick={() => {
                                generatePdfDescription([bud]);
                              }}
                            />
                            {/* <Btn
                              action="PDF de Orçamento"
                              color="dashboard"
                              onClick={() => {
                                generatePdfBudget([bud]);
                              }}
                            /> */}
                          </Box>
                        </Box>
                      </Box>
                    </Collapse>
                  </Box>
                );
              })}
            </>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
