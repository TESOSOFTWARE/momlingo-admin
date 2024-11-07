import vn from '../../../common/locales/vn';

export const renderNull = (value: string | number | null) => {
  if (value === null) return `${vn.ConfigPoint.List.labelNone}`;
  else return value;
};
