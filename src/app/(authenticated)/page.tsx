import {GenerateTariffProvider} from "@/contexts/generateTariff/generateTariff";
import {ModalDiscount} from "@/components/modal/ModalDiscount";
import ModalPermissionDiscount from "@/components/modal/ModalPermissionDiscount";
import {CalendarPicker} from "@/components/layout/CalendarPicker";
import {FormOrc} from "@/components/form/FormOrc";
import TableCalc from "@/components/table/TableCalc";
import {InfoTable} from "@/components/part/InfoTables";
import {ButtonsBudget} from "@/components/layout/ButtonsBudget";
import "./style.scss"
export default function Home() {
  return (
      <GenerateTariffProvider>
            <div className="p20">
              <div className="containerBx">
                {/* modal */}
                <ModalDiscount />
                <ModalPermissionDiscount />
                <div className="top">
                  <CalendarPicker />
                  <FormOrc />
                </div>
                <div className="bottom">
                  <TableCalc />
                </div>
                <div className="buttons">
                  <InfoTable />
                  <ButtonsBudget />
                </div>
              </div>
            </div>

      </GenerateTariffProvider>
  );
}
