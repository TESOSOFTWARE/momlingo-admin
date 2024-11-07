import { StatusChip } from '../../common/StatusChip';
import { OrderStatus } from '../interface';

export const renderOrderStatus = (value: string) => {
  const statusMap: Record<string, { label: string; color: string }> = {
    [OrderStatus.PENDING]: { label: value, color: '#F1C232' },
    [OrderStatus.CANCELLED]: { label: value, color: '#FF9CB5' },
    [OrderStatus.COMPLETED]: { label: value, color: '#00AB55' },
    [OrderStatus.FAILED]: { label: value, color: 'red' },
    [OrderStatus.ON_HOLD]: { label: value, color: '#7975A9' },
    [OrderStatus.PROCESSING]: { label: value, color: '#2EA9FF' },
    [OrderStatus.REFUNDED]: { label: value, color: '#98DFAF' },
    [OrderStatus.TRASH]: { label: value, color: '#DEEFB7' },
  };

  const status = statusMap[value];

  return status ? (
    <StatusChip labelProps={status.label} colorChip={status.color} />
  ) : null;
};
