export const convertChipLabel = (label: string) => {
  if (label === 'CONFIGURABLE') {
    return 'Đa biến thể';
  }
  if (label === 'SIMPLE') {
    return 'Một biến thể';
  }
  if (label === 'ACTIVE') {
    return 'Đang hoạt động';
  } else return '';
};
