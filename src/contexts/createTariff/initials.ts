import {CreateTariffProps} from "@/components/part/StepsCreateTariff/interfaces";

export const initValues = {
  adt: 0,
  adtex: 0,
  chd0: 0,
  chd4: 0,
  chd8: 0,
};

export const initValuesUHS = {
  PAD: initValues,
  PADV: initValues,
  LUX: initValues,
  LUXC: initValues,
  LUXH: initValues,
};

export const stepsSpecific = [
  "Tipo de tarifário",
  "Datas a serem aplicadas",
  "Tabela",
  "Valores R$",
  "Nome",
];

export const stepsCommon = [
  "Tipo de tarifário",
  "Datas a serem aplicadas",
  "Tabelas",
  "Valores MDS",
  "Valores FDS",
  "Nome",
];

export const initialValueTariff = {
  name: "",
  pipeNum: 0,
  values: {
    earlyEntryValues: {
      tenHour: initValues,
      twentyHour: initValues,
    },
    foodValue: initValues,
    UHsValues: {
      PAD: initValues,
      PADV: initValues,
      LUX: initValues,
      LUXC: initValues,
      LUXH: initValues,
    },
  },
};

export const initialValue: CreateTariffProps = {
  dates: [],
  tariffs: {
    midweek: initialValueTariff,
    weekend: initialValueTariff,
    specific: initialValueTariff,
  },
  type: "common",
};
