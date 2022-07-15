import { IDataItem } from "../model/appModel";
import { Value } from "../model/appState";

export default interface IOptions {
  paramInputRange: IParamInputRange[];
  paramInputValue: IParamInputValue[];
  paramSorter: IParamSorter;
}

export interface IParamInputRange {
  filter: string;
  id: keyof IDataItem;
  step: string;
  min: string;
  max: string;
  value: Value;
}

export interface IParamInputValue {
  filter: string;
  id: keyof IDataItem;
  value?: Value;
}

export interface IParamSorter {
  [key: string]: boolean;
}
