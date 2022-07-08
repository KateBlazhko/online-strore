import { IDataItem } from '../model/appModel';

export interface IDataInputRange {
  id: keyof IDataItem,
  value: {
    left: string,
    right: string,
  }
}

export const optionsInputRange: IDataInputRange[] = [
  { 
    id: 'price',
    value: {
      left: 'min',
      right: 'max',
    }
  },
  {
    id: 'release',
    value: {
      left: 'min',
      right: 'max',
    }
  },
  {
    id: 'quantity',
    value: {
      left: 'min',
      right: 'max',
    }
  }
]

export interface IParamInputRange {
  filter: string,
  step: string,
  min?: string,
  max?: string,
}

export const paramInputRange: IParamInputRange[] = [{ 
  filter: 'Фильтрация по цене, $',
  step: '1'
},
{
  filter: 'Фильтрация по году выпуска',
  step: '1'
},
{
  filter: 'Фильтрация по количеству',
  step: '1'
}
]