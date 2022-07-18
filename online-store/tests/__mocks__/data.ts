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
    {
      filter: "Price",
      id: "price",
      step: "1",
      min: "1",
      max: "10",
      value: { left: "min", right: "max" },
    },
  ],
  paramInputValue: [],
  paramSorter: { parameter: false },
};

const mockDataState = {
  sorter: { parameter: true },
  filter: { filter: { value: true } },
  cart: { id: 1 },
  search: "",
};
const mockonChange = { add: jest.fn() };
const mockData = [
  {
    image: 'none',
    model: 'model1',
    chipmaker: 'chipmaker1',
    memory: 'memory1',
    gpu: 'gpu1',
    other: '',
    release: '2000',
    popular: true,
    quantity: '1',
    price: "500",
    vendor: 'vendor1',
    id: "1",
  },
  {
    image: 'none',
    model: 'model2',
    chipmaker: 'chipmaker2',
    memory: 'memory2',
    gpu: 'gpu2',
    other: '',
    release: '2000',
    popular: 'true',
    quantity: '2',
    price: "1300",
    vendor: 'vendor2',
    id: "2",
  },
];

const mockFilterData = jest.fn();

const mockLoad = jest.fn().mockReturnValue("load");

export {
  mockOptions,
  mockDataState,
  mockonChange,
  mockData,
  mockFilterData,
  mockLoad,
};
