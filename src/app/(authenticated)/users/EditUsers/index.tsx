import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import "./style.scss";
import {useApi} from "@/hooks/api/api";
import {useParams} from "next/navigation";
import {ApiUserProps} from "@/hooks/api/interfaces";
import {FormEditCollaborator} from "@/components/form/FormEditCollaborator";

export const EditUsers = () => {
  const api = useApi();
  const { id } = useParams();
  const [user, setUser] = useState<ApiUserProps | undefined>();

  const getUser = async () => {
    const responseUser = await api.getaUser(id as string);
    setUser(responseUser);
  };

  useEffect(() => {
    getUser();
  }, []);

  if (user?.name === undefined) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }} m={10}>
        <CircularProgress />
      </Box>
    );
  }

  return (
      <div className="p20">
        <div className="containerBx">
          <div className="top">
            <div className="titleContainerBx">
              Editar Cadastro: {user?.name}
            </div>
          </div>
          <div className="form">
            <FormEditCollaborator fields={user} />
          </div>
        </div>
      </div>
  );
};
