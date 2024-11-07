export enum LANG {
  VIETNAMESE = 'VN',
  ENGLISH = 'EN',
}

export enum TYPE {
  STRING = 'STRING',
  IMAGE = 'IMAGE',
  COLOR = 'COLOR',
}

export const TABLE_HEAD_PROPS = [
  { id: 'name', label: 'Tên', align: 'center', flex: 1 },
  { id: 'type', label: 'Kiểu thuộc tính', align: 'center', flex: 1 },
  { id: 'description', label: 'Mô tả', align: 'center', flex: 1 },
  { id: 'lang', label: 'Ngôn ngữ', align: 'center', flex: 1 },
  { id: 'hasArchive', label: 'Lưu trữ', align: 'center', flex: 1 },
  { id: '', label: '' },
];
