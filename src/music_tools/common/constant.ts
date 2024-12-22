export const SelectLang = [
  { value: 'vi', label: 'Vietnamese' },
  { value: 'en', label: 'English' },
];

export const SelectGender = [
  { value: 'M', label: 'Nam' },
  { value: 'FM', label: 'Nữ' },
];

export const CATEGORY_TABLE_HEAD = [
  {
    id: 'id',
    label: 'ID',
    align: 'left',
  },
  {
    id: 'name',
    label: 'Tên bài hát',
    align: 'left',
  },
  {
    id: 'artist',
    label: 'Tác giả',
    align: 'left',
  },
  {
    id: 'description',
    label: 'Mô tả',
    align: 'left',
  },
  {
    id: '',
    label: 'Tùy chọn',
    align: 'center',
  },
];
export const DEFAULT_VALUE_CATEGORY_FORM = {
  description: '',
  artist: '',
  name: '',
  // fileUrl: '',
};
export const DEFAULT_VALUE_MUSIC_FORM = {
  description: '',
  artist: '',
  name: '',
  // fileUrl: '',
};
