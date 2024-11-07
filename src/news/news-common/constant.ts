import { NewsStatus } from "./interface";

export const subjectFilter = [
  { value: 'HEALTH_AND_LIFE', label: 'Sức khỏe & đời sống' },
  { value: 'CULTURE', label: 'Văn hóa' },
  { value: 'SOCIALLY', label: 'Xã hội' },
  { value: 'MOM_AND_BABY', label: 'Mẹ & bé' },
];

export const DEFAULT_VALUE_FORM_NEWS = {
  title: '',
  subjectIds: [],
  status: NewsStatus.ACTIVE,
  content: '',
  author: '',
  description: '',
};