import { LangObj } from '../interface/interface';

export enum LANG {
  VIETNAMESE = 'VN',
  ENGLISH = 'EN',
}

export type Lang = 'vn' | 'en';

export enum TYPE {
  STRING = 'STRING',
  IMAGE = 'IMAGE',
  COLOR = 'COLOR',
}

export const PRODUCT_ATTRIBUTE_DETAILS = {
  [LANG.VIETNAMESE]: {
    name: '',
    slug: '',
    description: '',
  },
  [LANG.ENGLISH]: {
    name: '',
    slug: '',
    description: '',
  },
};

export const dataPostProductDefault = {
  type: TYPE.STRING || TYPE.IMAGE || TYPE.COLOR,
  productAttributeDetails: [PRODUCT_ATTRIBUTE_DETAILS],
};

export const TYPE_OPTION = [
  {
    value: TYPE.STRING,
    label: TYPE.STRING,
  },
  {
    value: TYPE.COLOR,
    label: TYPE.COLOR,
  },
  {
    value: TYPE.IMAGE,
    label: TYPE.IMAGE,
  },
];

export const LANG_OPTION = [
  {
    value: LANG.VIETNAMESE,
    label: LANG.VIETNAMESE,
  },
  {
    value: LANG.ENGLISH,
    label: LANG.ENGLISH,
  },
];

export const langs: Record<LANG, LangObj> = {
  EN: {
    label: 'Vietnamese',
    value: 'vn',
    icon: '/assets/icons/flags/ic_flag_en.svg',
  },
  VN: {
    label: 'English',
    value: 'vn',
    icon: '/assets/icons/flags/ic_flag_vn.svg',
  },
};
