import "./style.scss";
import {FormNewCollaborator} from "@/components/form/FormNewCollaborator";

export const NewUsersPage = () => {
  return (
        <div className="p20">
          <div className="containerBx">
            <div className="top">
              <div className="titleContainerBx">Cadastrar Colaborador</div>
            </div>
            <div className="form">
              <FormNewCollaborator />
            </div>
          </div>
        </div>
  );
};
