export const renderTypeName = (value: string) => {
  if (value === 'CONFIGURABLE') {
    return 'Nhiều biến thể';
  }
  if (value === 'SIMPLE') {
    return 'Một biến thể';
  }
  if (value === 'VIRTUAL') {
    return 'Voucher';
  }
};
