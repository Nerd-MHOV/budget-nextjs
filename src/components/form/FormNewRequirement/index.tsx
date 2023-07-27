import { TextField } from "@mui/material";
import {  useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { ErrorComponent } from "./ErrorComponent";
import "./style.scss";
import {useRouter} from "next/router";
import {useApi} from "@/hooks/api/api";
import Btn from "@/components/layout/Btn/Btn";

export const FormNewRequirement = () => {
  const { register, handleSubmit } = useForm();
  const route = useRouter();
  const api = useApi();
  const [errForm, setErrForm] = useState("");

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    api
      .createRequirement(data.name, Number(data.price))
      .then((response) => {
        route.push("/requirements");
      })
      .catch((err) => {
        setErrForm("Erro do servidor");
        if (err?.response?.data?.message?.message)
          setErrForm(err.response.data.message.message);
        console.log(err);
      });
  };

  return (
    <div className="new-requirement">
      {!!errForm && <ErrorComponent msg={errForm} />}
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid">
          <TextField
            required
            margin="dense"
            {...register("name")}
            label="Nome"
            type="text"
            variant="outlined"
          />
          <TextField
            required
            margin="dense"
            {...register("price")}
            label="Preço"
            type="text"
            variant="outlined"
          />
        </div>

        <div className="button">
          <Btn action="Cadastrar" color="darkBlue" onClick={() => {}} />
        </div>
      </form>
    </div>
  );
};
