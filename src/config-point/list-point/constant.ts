import vn from '../../common/locales/vn';

export const TABLE_HEAD_PROPS = [
  { id: 'code', label: `${vn.ConfigPoint.List.tableCode}`, align: 'center' },
  { id: 'point', label: `${vn.ConfigPoint.List.tablePoint}`, align: 'center' },
  {
    id: 'productGroup',
    label: `${vn.ConfigPoint.List.tableProductGroup}`,
    align: 'center',
  },
  { id: 'type', label: `${vn.ConfigPoint.List.tableType}`, align: 'center' },
  { id: 'weight', label: `${vn.ConfigPoint.List.tableWeight}`, align: 'center' },
  { id: 'isActive', label: `${vn.ConfigPoint.List.tableIsActive}`, align: 'center' },
  { label: '', align: 'center' },
];

export const TypeSearch = [
  { value: undefined, label: '' },
  { value: 'SPOON', label: 'Spoon' },
  { value: 'SBPS', label: 'SBPS' },
];

export const IsActiveSearch = [
  { value: undefined, label: '' },
  { value: 'true', label: 'Đang hoạt động' },
  { value: 'false', label: 'Không hoạt động' },
];

export const defaultValueSearch = {
  searchText: undefined,
  type: undefined,
  isActive: undefined,
};
