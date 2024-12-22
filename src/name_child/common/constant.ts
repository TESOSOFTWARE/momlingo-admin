export const SelectLang = [
  { value: 'vi', label: 'Vietnamese' },
  { value: 'en', label: 'English' },
];

export const SelectGender = [
  { value: 'male', label: 'Nam' },
  { value: 'female', label: 'Nữ' },
];

export const CATEGORY_TABLE_HEAD = [
  {
    id: 'id',
    label: 'ID',
    align: 'left',
  },
  {
    id: 'name',
    label: 'Tên danh mục',
    align: 'left',
  },
  {
    id: 'lan',
    label: 'Ngôn ngữ',
    align: 'left',
  },
  {
    id: '',
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
  lang: '',
  desc: '',
  name: '',
  slug: '',
  gender: '',
};
