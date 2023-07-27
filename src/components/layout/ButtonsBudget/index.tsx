"use client"
import { useContext } from "react";
import {GenerateTariffContext} from "@/contexts/generateTariff/generateTariff";
import {useApi} from "@/hooks/api/api";
import {usePipe} from "@/hooks/pipedrive/pipeApi";
import EvitaBug from "@/contexts/generateTariff/functions/evitaBugPDF";
import pdfDescription from "@/contexts/generateTariff/functions/pdfDescription";
import {pipeChangeDeal} from "@/contexts/generateTariff/functions/pipeChangeDeal";
import pdfBudget from "@/contexts/generateTariff/functions/pdfBudget";
import {useSession} from "next-auth/react";
import Btn from "@/components/layout/Btn/Btn";

export const ButtonsBudget = () => {
  const { budgets, handleSaveBudget, clearTariffs } = useContext(
    GenerateTariffContext
  );
  const {data: session } = useSession()
  const api = useApi();
  const pipe = usePipe();
  function evitaBug() {
    EvitaBug(budgets, "token");
  }
  async function generatePdfDescription() {
    // if (
    //   budgets.find((budget) =>
    //     budget.arrComplete.responseForm.category.match(/Day-Use/)
    //   )
    // ) {
    //   return;
    // }
    if(!session?.user?.id) return;

  const arrUser = await api.findUniqueUser(session.user.id);
    const deal_id = budgets[0].arrComplete.responseForm.numberPipe;
    let response;
    if (deal_id) response = await pipe.getaDeal(arrUser.token_pipe, deal_id);
    let name = response?.data?.person_name || "";
    pdfDescription(budgets, arrUser.token_pipe, name);
  }

  async function generatePdfBudget() {
    if(!session?.user?.id) return;

    if (budgets.length < 1) {
      return;
    }
    pipeChangeDeal(session.user.id, budgets);
    if (
      budgets.find((budget) =>
        budget.arrComplete.responseForm.category.match(/Day-Use/)
      )
    ) {
      return;
    }
    const arrUser = await api.findUniqueUser(session.user.id);
    pdfBudget(
      budgets,
      arrUser.name,
      arrUser.email,
      arrUser.phone,
      arrUser.token_pipe
    );

    api
      .saveBudget(session.user.id, budgets)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  }

  return (
    <div className="boxButtons" style={{ marginTop: 32 }}>
      <Btn action="Salvar Orçamento" color="blue" onClick={handleSaveBudget} />
      <Btn
        action="Gerar PDF Orçamento"
        color="darkBlue"
        onClick={generatePdfBudget}
      />
      <Btn
        action="Memória de Cálculo"
        color="dashboard"
        onClick={generatePdfDescription}
      />
      <Btn action="Limpar" color="red" onClick={clearTariffs} />
    </div>
  );
};
