import { EnumStatus } from './../../list-agent/interface';
export const renderStatus = (value: string) => {
  if (value === EnumStatus.APPROVED) return 'Đã duyệt';
  if (value === EnumStatus.BLOCKED) return 'Đã chặn';
  if (value === EnumStatus.REFUSED) return 'Đã từ chối';
  if (value === EnumStatus.UNVERIFIED) return 'Chưa xác thực';
  if (value === EnumStatus.VERIFIED) return 'Đã xác thực';
  else return value;
};
