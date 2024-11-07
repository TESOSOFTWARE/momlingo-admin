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
      id: 'gameId',
      label: 'Game ID',
      align: 'center',
    },
    {
      id: 'productGroup',
      label: i18n.t('configPlayTime.list.header.productGroup'),
      align: 'center',
    },
    {
      id: 'weight',
      label: i18n.t('configPlayTime.list.header.weight'),
      align: 'center',
    },
    {
      id: 'value',
      label: i18n.t('configPlayTime.list.header.value'),
      align: 'center',
    },
    {
      id: 'action',
      label: '',
      align: 'right',
    },
];

export const CONFIG_PLAYTIME_DEFAULT_VALUES = {
  gameId: undefined,
  productGroup: '',
  weight: undefined,
  value: undefined,
}