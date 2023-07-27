import "./style.scss";
import {FormNewRequirement} from "@/components/form/FormNewRequirement";

export const NewRequirementPage = () => {
  return (
        <div className="p20">
          <div className="containerBx">
            <div className="top">
              <div className="titleContainerBx">Cadastrar Requerimento</div>
            </div>
            <div className="form">
              <FormNewRequirement />
            </div>
          </div>
        </div>
  );
};
