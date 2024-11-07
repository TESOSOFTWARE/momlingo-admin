import { EnumStatus } from './interface';

export const StatusLabel = [
  { value: EnumStatus.APPROVED, label: 'Đã duyệt' },
  { value: EnumStatus.BLOCKED, label: 'Đã chặn' },
  { value: EnumStatus.REFUSED, label: 'Đã từ chối' },
  { value: EnumStatus.UNVERIFIED, label: 'Chưa xác thực' },
  { value: EnumStatus.VERIFIED, label: 'Đã xác thực' },
];
