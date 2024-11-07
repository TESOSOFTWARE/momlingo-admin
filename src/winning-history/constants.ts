import { IHeadType, IDataTest, IFilterOption } from './interface';

export const headsData: IHeadType[] = [
  {
    id: 'id',
    label: 'ID',
  },
  {
    id: 'user',
    label: 'USER',
  },
  {
    id: 'phone',
    label: 'PHONE',
  },
  {
    id: 'gift',
    label: 'GIFT',
  },
  {
    id: 'datetime',
    label: 'TIME',
  },
  {
    id: 'code',
    label: 'CODE',
  },
];

export const headerCSVExport = [
  {
    label: 'ID',
    key: 'id',
  },
  {
    label: 'USER',
    key: 'user',
  },
  {
    label: 'PHONE',
    key: 'phone',
  },
  {
    label: 'GIFT',
    key: 'gift',
  },
  {
    label: 'TIME',
    key: 'time',
  },
  {
    label: 'CODE',
    key: 'code',
  },
];

export const filterOptions: IFilterOption[] = [
  {
    label: 'PHONE NUMBER',
    value: 'PHONE_NUMBER',
  },
  {
    label: 'GIFT NAME',
    value: 'GIFT_NAME',
  },
  {
    label: 'EVENT ID',
    value: 'EVENT_ID',
  },
  {
    label: 'CODE',
    value: 'CODE',
  },
];
