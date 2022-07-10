import { IDataItem } from '../../model/appModel';

export interface IParamInputRange {
  filter: string,
  id: keyof IDataItem,
  step: string,
  min?: string,
  max?: string,
  value: {
    left: string,
    right: string
  }
}

export const paramInputRange: IParamInputRange[] = [{ 
  filter: 'Price',
  id: 'price', 
  step: '1',
  value: {
    left: 'min',
    right: 'max'
  }
},
{
  filter: 'Year',
  id: 'release',
  step: '1',
  value: {
    left: 'min',
    right: 'max'
  }
},
{
  filter: 'Count',
  id: 'quantity',
  step: '1',
  value: {
    left: 'min',
    right: 'max'
  }
}]