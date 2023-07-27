"use client"
import { useContext, useState } from "react";

import "./style.scss";
import {CreateTariffContext, CreateTariffContextProvider} from "@/contexts/createTariff/createTariff";
import {stepsCommon} from "@/contexts/createTariff/initials";
import {CreateTariffProps} from "@/components/part/StepsCreateTariff/interfaces";
import {StepperTariff} from "@/components/part/StepsCreateTariff/Stepper";
import {TypeTariff} from "@/components/part/StepsCreateTariff/typeTariff";
import {MonthsCommon} from "@/components/part/StepsCreateTariff/Months";
import {InputTables} from "@/components/part/StepsCreateTariff/InputTables";
import {ValuesStep} from "@/components/part/StepsCreateTariff/ValuesStep";
import {NameAndConfirmStep} from "@/components/part/StepsCreateTariff/NameAndConfirmStep";


 const NewTariff = () => {
  const { typeTariff } = useContext(CreateTariffContext);
  const [steps, setSteps] = useState(stepsCommon);
  const [activeStep, setActiveStep] = useState(0);
  const [nextActive, setNextActive] = useState(false);
  const [newTariff, setNewTariff] = useState<CreateTariffProps>();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setNextActive(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setNextActive(false);
  };

  return (
    <CreateTariffContextProvider
      next={setNextActive}
      step={setSteps}
      activeStep={setActiveStep}
    >
          <div className="p20">
            <div className="containerBx">
              <div className="titleContainerBx">Adicionar Tarifário</div>
              <StepperTariff
                nextActive={nextActive}
                activeStep={activeStep}
                handleBack={handleBack}
                handleNext={handleNext}
                steps={steps}
              >
                <>
                  {activeStep === 0 && <TypeTariff />}
                  {activeStep === 1 && <MonthsCommon />}
                  {activeStep === 2 && <InputTables />}
                  {activeStep === 3 && steps[3] === "Valores MDS" && (
                    <ValuesStep title="Valores para MDS" type="midweek" />
                  )}

                  {activeStep === 3 && steps[3] === "Valores R$" && (
                    <ValuesStep
                      title="Valores Para os dias Selecionados"
                      type="specific"
                    />
                  )}
                  {activeStep === 4 && steps[4] === "Valores FDS" && (
                    <ValuesStep title="Valores para FDS" type="weekend" />
                  )}

                  {((activeStep === 4 && steps[4] === "Nome") ||
                    activeStep === 5) && <NameAndConfirmStep />}
                </>
              </StepperTariff>
            </div>
          </div>
    </CreateTariffContextProvider>
  );
};

 export default NewTariff
