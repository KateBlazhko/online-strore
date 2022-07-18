import { IDataItem } from "../../src/components/model/appModel";

interface IOptions {
  paramInputRange: IParamInputRange[];
  paramInputValue: IParamInputValue[];
  paramSorter: IParamSorter;
}

interface IParamInputRange {
  filter: string;
  id: keyof IDataItem;
  step: string;
  min: string;
  max: string;
  value: {
    [key: string]: string | boolean;
  };
}

interface IParamInputValue {
  filter: string;
  id: keyof IDataItem;
  value?: {
    [key: string]: string | boolean;
  };
}

interface IParamSorter {
  [key: string]: boolean;
}

const mockOptions: IOptions = {
  paramInputRange: [
    { filter: "Price", id: "price", step: "1", min: "1", max: "10", value: { left: "min", right: "max" } },
  ],
  paramInputValue: [],
  paramSorter : {'parameter': false}};

const mockDataState = { sorter: {'parameter': true}, filter: {'filter': {'value': true}}, cart: {'id': 1}, search: '' }
const mockonChange = { add:  jest.fn()}
const mockData = [
  {
    "price": "500",
    "id": "1"
  },
  {
    "price": "1300",
    "id": "2"
  },
]

const mockFilterData = jest.fn();

const mockLoad = jest.fn().mockReturnValue('load');



export{
  mockOptions,
  mockDataState,
  mockonChange,
  mockData,
  mockFilterData,
  mockLoad
}
