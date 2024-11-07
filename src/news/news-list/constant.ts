export const HEAD_TABLE_PROPS = [
  { id: 'id', label: 'ID', align: 'center' },
  { id: 'img', label: '', align: 'center' },
  { id: 'title', label: 'Tiêu đề', align: 'left' },
  { id: 'subject', label: 'Chủ đề', align: 'center' },
  { id: '', label: 'Tùy chọn', align: 'center' }, 
];

export const defaultValueFilter = {
  title: undefined,
  fromDate: null,
  toDate: null,
  subjectIds: [],
};
