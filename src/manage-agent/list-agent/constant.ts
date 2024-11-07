export const HEAD_TABLE_PROPS = [
  { label: '' },
  { id: 'name', label: 'Tên', align: 'left' },
  { id: 'email', label: 'Email', align: 'center' },
  { id: 'status', label: 'Trạng thái', align: 'center' },
  { label: '' },
];

export const agentRank = [
  { value: undefined, label: '' },
  { value: 'BASIC', label: 'Cơ bản' },
];

export const agentStatus = [
  { value: 'UNVERIFIED', label: 'Chưa xác thực' },
  { value: 'VERIFIED', label: 'Đã xác thực' },
  { value: 'APPROVED', label: 'Đã duyệt' },
  { value: 'REFUSED', label: 'Đã từ chối' },
  { value: 'BLOCKED', label: 'Đã chặn' },
];

export const defaultValueFilter = {
  status: undefined,
  rank: undefined,
  searchText: undefined,
};
