import i18n from 'src/common/locales/i18n';

export const DEFAULT_VALUE_FEATURE_CONFIG = {
  name: '',
  status: false,
};

export const TABLE_HEAD = [
  { id: 'code', label: i18n.t('featureConfig.tableHeader.code'), align: 'left' },
  { id: 'name', label: i18n.t('featureConfig.tableHeader.name'), align: 'left', flex: 1 },
  {
    id: 'action',
    label: i18n.t('featureConfig.tableHeader.status'),
    align: 'center',
    flex: 1,
  },
  { id: '', label: i18n.t('featureConfig.tableHeader.edit'), align: 'center' },
];
