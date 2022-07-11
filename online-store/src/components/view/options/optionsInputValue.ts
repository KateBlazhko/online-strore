import { IDataItem } from "../../model/appModel";
import { Value } from "../../model/appState";

export interface IParamInputValue {
  filter: string;
  id: keyof IDataItem;
  value?: Value;
}

export const paramInputValue: IParamInputValue[] = [
  {
    filter: "Chipmaker",
    id: "chipmaker",
  },
  {
    filter: "Vendor",
    id: "vendor",
  },
  {
    filter: "GPU",
    id: "gpu",
  },
  {
    filter: "Popular",
    id: "popular",
  },
];
