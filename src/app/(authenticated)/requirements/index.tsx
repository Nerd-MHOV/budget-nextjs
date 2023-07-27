import { useEffect, useState } from "react";
import "./style.scss";
import {useApi} from "@/hooks/api/api";
import TableRequirements, {createRequirementsData, dataRequirementsProps} from "@/components/table/TableRequirements";
import {ApiRequirementsProps} from "@/hooks/api/interfaces";
import Link from "next/link";
import Btn from "@/components/layout/Btn/Btn";

export const RequirementsPage = () => {
  const api = useApi();
  const [rows, setRows] = useState<dataRequirementsProps[]>([]);

  const getRequirements = async () => {
    const requirements = await api.getRequirements();
    console.log(requirements);
    makeRows(requirements);
  };

  //
  const makeRows = (requirements: ApiRequirementsProps[]) => {
    let lines: dataRequirementsProps[] = [];
    requirements.map((requirement) => {
      if (
        requirement.name !== "check-in às 12h sem apto" &&
        requirement.name !== "check-in às 10h com apto"
      )
        lines.push(
          createRequirementsData(
            requirement.name,
            requirement.price,
            requirement.active
          )
        );
    });
    setRows(lines);
  };

  useEffect(() => {
    getRequirements();
  }, []);
  return (
        <div className="p20">
          <div className="containerBx">
            <div className="top">
              <div className="titleContainerBx">Requerimentos</div>
              <Link href="/requirements/create" className="link">
                <Btn action=" + " color="dashboard" onClick={() => {}} />
              </Link>
            </div>
            <div className="table">
              <TableRequirements rows={rows} att={getRequirements} />
            </div>
          </div>
        </div>
  );
};
