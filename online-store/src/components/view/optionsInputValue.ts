import { IDataItem } from '../model/appModel';

export interface IParamInputValue {
  filter: string,
  id: keyof IDataItem,
  value?: {
    [key: string]: string | boolean
  }
}

export const paramInputValue: IParamInputValue[] = [
  { 
    filter: 'Чипмейкер',
    id: 'chipmaker'
  },
  {
    filter: 'Производитель',
    id: 'vendor'
  },
  {
    filter: 'Графический процессор',
    id: 'gpu'
  },
  {
    filter: 'Популярный товар',
    id: 'popular'
  }
]