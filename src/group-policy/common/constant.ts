import i18n from 'src/common/locales/i18n';

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
    label: i18n.t('group_policy.label.name'),
    align: 'center',
  },
  {
    id: 'description',
    label: i18n.t('group_policy.label.description'),
    align: 'center',
  },
  {
    id: 'status',
    label: i18n.t('group_policy.label.status'),
    align: 'center',
  },
  {
    id: 'type',
    label: i18n.t('group_policy.label.type'),
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
  {
    value: '',
    label: 'All',
  },
  { value: 'COMMON', label: 'Common' },
  { value: 'MERCHANT', label: 'Merchant' },
  { value: 'ADMIN', label: 'Admin' },
];

export const GROUP_POLICY_DEFAULT_VALUES = {
  name: '',
  description: '',
  policyIds: [],
};
