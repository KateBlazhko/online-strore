import { IDataItem } from '../model/appModel';

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