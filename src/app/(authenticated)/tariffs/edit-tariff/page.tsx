"use client"
import { useEffect, useState } from "react";

import "./style.scss";
import {useApi} from "@/hooks/api/api";
import {useParams} from "next/navigation";
import {AllTariffsProps} from "@/hooks/api/interfaces";
import {EditTariffContextProvider} from "@/contexts/editTariff/editTariff";
import {StepperTariff} from "@/components/part/StepsEditTariff/Stepper";
import {MonthsCommon} from "@/components/part/StepsEditTariff/Months";
import {NameAndConfirmStep} from "@/components/part/StepsEditTariff/NameAndConfirmStep";
import {ValuesStep} from "@/components/part/StepsEditTariff/ValuesStep";

const stepsToEdit = ["Datas a serem aplicadas", "Valores R$", "Nome"];

 const EditTariff = () => {
  const api = useApi();
  const [steps, setSteps] = useState(stepsToEdit);
  const [activeStep, setActiveStep] = useState(0);
  const [nextActive, setNextActive] = useState(false);
  const [tariff, setTariff] = useState<AllTariffsProps>();
  const { id } = useParams();
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setNextActive(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setNextActive(false);
  };

  const getTariff = async () => {
    const tariffResponse = await api.getaTariff(id as string);
    setTariff(tariffResponse);
  };

  useEffect(() => {
    getTariff();
  }, []);

  return (
    <EditTariffContextProvider
      tariff={tariff}
      next={setNextActive}
      activeStep={setActiveStep}
    >
          <div className="p20">
            <div className="containerBx">
              <div className="titleContainerBx">Editar: {id}</div>
              <StepperTariff
                nextActive={nextActive}
                activeStep={activeStep}
                handleBack={handleBack}
                handleNext={handleNext}
                steps={steps}
              >
                <>
                  {activeStep === 0 && <MonthsCommon />}
                  {activeStep === 1 && (
                    <ValuesStep title="Valores para MDS" type="midweek" />
                  )}
                  {activeStep === 2 && <NameAndConfirmStep />}
                </>
              </StepperTariff>
            </div>
          </div>
    </EditTariffContextProvider>
  );
};

 export default EditTariff
