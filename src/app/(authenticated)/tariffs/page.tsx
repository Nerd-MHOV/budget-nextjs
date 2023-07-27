"use client"
import { useEffect, useState } from "react";
import "./style.scss";
import {useApi} from "@/hooks/api/api";
import {createData} from "@/components/table/TableCollapseTariffs/helpers";
import {AllTariffsProps} from "@/hooks/api/interfaces";
import CollapsibleTableTariff from "@/components/table/TableCollapseTariffs";
import Link from "next/link";
import Btn from "@/components/layout/Btn/Btn";
const TariffsPage = () => {
  const api = useApi();
  const [rows, setRows] = useState<ReturnType<typeof createData>[]>([]);
  const [tariffs, setTariffs] = useState<AllTariffsProps[]>([]);

  const getTariffs = async () => {
    const response = await api.getAllTariffs();
    setTariffs(response);
  };

  const makeRows = async () => {
    let rows: ReturnType<typeof createData>[] = [];
    tariffs.map((tariff) => {
      rows.push(createData(tariff));
    });

    setRows(rows);
  };

  const handleChangeOrder = async (id: number, side: string) => {
    await api.changeOrderTariff(id, side).then((response) => {
      getTariffs();
    });
  };

  const handleToggleActive = async (name: string, active: boolean) => {
    await api.toggleActiveTariff(name, active).then((response) => {
      getTariffs();
    });
  };

  useEffect(() => {
    makeRows();
  }, [tariffs]);

  useEffect(() => {
    getTariffs();
  }, []);
  return (
        <div className="p20">
          <div className="containerBx">
            <div className="top">
              <div className="titleContainerBx">Lista de Tarifários</div>
              <Link href="/tariffs/create" className="link">
                <Btn action=" + " color="dashboard" onClick={() => {}} />
              </Link>
            </div>
            <div className="table">
              <CollapsibleTableTariff
                rows={rows}
                handleChangeOrder={handleChangeOrder}
                handleToggleActive={handleToggleActive}
                allTariffs={tariffs}
                reloadRows={getTariffs}
              />
            </div>
          </div>
        </div>
  );
};

export default TariffsPage;