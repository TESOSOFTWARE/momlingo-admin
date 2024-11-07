import i18n from 'src/common/locales/i18n';

export const DEFAULT_VALUE_EVENT_CONFIG = {
  desc: '',
  status: false,
  startDate:'',
  endDate:''
};

export const TABLE_HEAD = [
  { id: 'code', label: i18n.t('configEvent.tableHeader.code'), align: 'left' },
  { id: 'name', label: i18n.t('configEvent.tableHeader.desc'), align: 'left' },
  { id: 'name', label: i18n.t('configEvent.tableHeader.startDate'), align: 'left', flex: 1 },
  { id: 'name', label: i18n.t('configEvent.tableHeader.endDate'), align: 'left', flex: 1 },

  {
    id: 'action',
    label: i18n.t('featureConfig.tableHeader.status'),
    align: 'center',
    flex: 1,
  },
  { id: '', label: i18n.t('featureConfig.tableHeader.edit'), align: 'center' },
];
