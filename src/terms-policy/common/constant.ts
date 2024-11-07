export enum LANG {
  VIETNAMESE = 'VN',
  ENGLISH = 'EN',
}

export enum TYPE {
  TERMS = 'TERMS',
  POLICY = 'POLICY',
}

export enum STATUS {
  ACTIVE = 'ACTIVE',
  IN_ACTIVE = 'IN_ACTIVE',
}

export const HEAD_LABELS = [
  {
    id: '',
    label: '',
    align: 'center',
  },
  {
    id: 'id',
    label: 'ID',
    align: 'center',
  },
  {
    id: 'name',
    label: 'Name',
    align: 'center',
  },
  {
    id: 'status',
    label: 'Status',
    align: 'center',
  },
  {
    id: 'lang',
    label: 'Language',
    align: 'center',
  },
  {
    id: 'type',
    label: 'Type',
    align: 'center',
  },
  {
    id: 'createdAt',
    label: 'Created At',
    align: 'center',
  },
  {
    id: 'updated At',
    label: 'Updated At',
    align: 'center',
  },
  {
    id: 'action',
    label: '',
    align: 'right',
  },
];

export const STATUS_OPTIONS = [
  {
    value: '',
    label: 'All',
  },
  { value: 'ACTIVE', label: 'Active' },
  { value: 'IN_ACTIVE', label: 'Inactive' },
];

export const TYPE_OPTIONS = [
  { value: 'TERMS', label: 'Terms' },
  { value: 'POLICY', label: 'Policy' },
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

export const defaultValueForm = {
  type: TYPE.POLICY,
  icon: '',
  lang: LANG.VIETNAMESE,
  name: '',
  content: '',
  status: true,
};

export const defaultUpdateValueForm = {
  id: 0,
  type: TYPE.POLICY,
  icon: '',
  lang: LANG.VIETNAMESE,
  termPolicyDetailIds: 0,
  name: '',
  content: '',
  status: true,
};
