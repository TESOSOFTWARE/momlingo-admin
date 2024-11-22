export const HEAD_TABLE_PROPS = [
  { label: '' },
  { id: 'product', label: 'Sản phẩm', align: 'center' },
  { id: 'isFeatured', label: 'Nổi bật', align: 'center' },
  { id: 'type', label: 'Loại sản phẩm', align: 'center' },
  { id: 'status', label: 'Trạng thái', align: 'center' },
  { id: 'taxStatus', label: 'Thuế', align: 'center' },
  { label: '' },
];

export const statusFilter = [
  { value: undefined, label: 'Tất cả' },
  { value: 'ACTIVE', label: 'Active' },
  { value: 'IN_ACTIVE', label: 'In Active' },
  // { value: 'BANNED', label: 'Bị khóa' },
];
export const typeFilter = [
  { value: undefined, label: 'Tất cả' },
  { value: 'NAME', label: 'Tên' },
];
export const taxFilter = [
  { value: undefined, label: 'Tất cả' },
  { value: 'TAXABLE', label: 'Có thuế' },
  { value: 'NONE', label: 'Không thuế' },
];
export const productTypeFilter = [
  { value: undefined, label: 'Tất cả' },
  { value: 'SIMPLE', label: 'Một biến thể' },
  { value: 'CONFIGURABLE', label: 'Nhiều biến thể' },
  { value: 'VIRTUAL', label: 'E-Voucher' },
];

export const DEFAULT_SEARCH_PRODUCT = {
  searchText: undefined,
  searchType: undefined,
  productStatus: undefined,
  taxStatus: undefined,
  productType: undefined,
};
