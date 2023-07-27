import { useEffect, useState } from "react";
import "./style.scss";
import {useApi} from "@/hooks/api/api";
import TableUsers, {createDataUsers, dataUserProps} from "@/components/table/TableUsers";
import {ApiUserProps} from "@/hooks/api/interfaces";
import Link from "next/link";
import Btn from "@/components/layout/Btn/Btn";

export const UsersPage = () => {
  const api = useApi();
  const [rows, setRows] = useState<dataUserProps[]>([]);

  const getUsers = async () => {
    const users = await api.getUsers();
    console.log(users);
    makeRows(users);
  };

  const makeRows = (users: ApiUserProps[]) => {
    let lines: dataUserProps[] = [];
    users.map((user) => {
      lines.push(
        createDataUsers(
          user.id,
          user.name,
          user.level,
          Number(user.user_pipe),
          user.active
        )
      );
    });
    setRows(lines);
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
        <div className="p20">
          <div className="containerBx">
            <div className="top">
              <div className="titleContainerBx">Usuários Cadastrados</div>
              <Link href="/users/create" className="link">
                <Btn action=" + " color="dashboard" onClick={() => {}} />
              </Link>
            </div>
            <div className="table">
              <TableUsers rows={rows} att={getUsers} />
            </div>
          </div>
       </div>
  );
};
