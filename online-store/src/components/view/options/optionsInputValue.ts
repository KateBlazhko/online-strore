import { IDataItem } from '../../model/appModel';

export interface IParamInputValue {
  filter: string,
  id: keyof IDataItem,
  value?: {
    [key: string]: string | boolean
  }
}

export const paramInputValue: IParamInputValue[] = [
  { 
    filter: 'Chipmaker',
    id: 'chipmaker'
  },
  {
    filter: 'Vendor',
    id: 'vendor'
  },
  {
    filter: 'GPU',
    id: 'gpu'
  },
  {
    filter: 'Popular',
    id: 'popular'
  }
]