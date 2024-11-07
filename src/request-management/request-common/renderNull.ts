import lodash from 'lodash';
import vn from '../../common/locales/vn';
import { formatDay_DMY } from './FormatDate';

export const renderHaveORNo = (value: number | string) => {
  return value ? value : vn.notYet;
};

export const renderApprovedDate = (value: string | null) => {
  if (value === null) {
    return vn.notApprove;
  } else formatDay_DMY(value);
};

export const renderRejectDes = (value: string | null) => {
  return lodash.isEmpty(value) ? 'Chưa có mô tả từ chối' : value;
};
