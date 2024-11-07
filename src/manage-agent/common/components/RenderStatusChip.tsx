import { EnumStatus } from '../../list-agent/interface';
import { StatusChip } from './StatusChip';

export const RenderStatusChip = (value: string) => {
  const statusMap: Record<string, { label: string; color: string }> = {
    ['Đã duyệt']: { label: value, color: '#57C5B6' },
    ['Đã chặn']: { label: value, color: '#E06469' },
    ['Đã từ chối']: { label: value, color: '#080202' },
    ['Chưa xác thực']: { label: value, color: '#526D82' },
    ['Đã xác thực']: { label: value, color: '#A4D0A4' },
  };

  const status = statusMap[value];

  return status ? (
    <StatusChip labelProps={status.label} colorChip={status.color} />
  ) : null;
};
