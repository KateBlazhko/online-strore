import { IDataItem } from '../model/appModel';

export interface IDataInputValue {
  id: keyof IDataItem,
  value: string
}

export const optionsInputValue: IDataInputValue[] = [
  // { 
  //   id: 'chipmaker',
  //   value: 'NVIDIA'
  // },
  // {
  //   id: 'popular',
  //   value: 'true'
  // },
  // {
  //   id: 'vendor',
  //   value: 'Asus'
  // }
]

export interface IParamInputValue {
  filter: string,
  step: string,
  min?: string,
  max?: string,
}

export const paramInputRange: IParamInputValue[] = [{ 
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