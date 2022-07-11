import { IDataItem } from "../../model/appModel";
import { Value } from "../../model/appState";

export interface IParamInputRange {
  filter: string;
  id: keyof IDataItem;
  step: string;
  min: string;
  max: string;
  value: Value;
}

export const paramInputRange: IParamInputRange[] = [
  {
    filter: "Price",
    id: "price",
    step: "1",
    min: "500",
    max: "3000",
    value: {
      left: "min",
      right: "max",
    },
  },
  {
    filter: "Year",
    id: "release",
    step: "1",
    min: "2000",
    max: "2022",
    value: {
      left: "min",
      right: "max",
    },
  },
  {
    filter: "Count",
    id: "quantity",
    step: "1",
    min: "1",
    max: "10",
    value: {
      left: "min",
      right: "max",
    },
  },
];
