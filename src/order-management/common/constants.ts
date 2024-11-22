import { IStatusOrderGift } from './interface';

export const STATUS_ORDER_GIFT_STYLE: IStatusOrderGift = {
  PROCESSING: {
    label: 'Processing',
    color: '#85CDFD',
  },
  ON_HOLD: {
    label: 'On hold',
    color: '#635985',
  },
  COMPLETED: {
    label: 'Completed',
    color: 'green',
  },
  CANCELLED: {
    label: 'Canceled',
    color: 'red',
  },
  REFUNDED: {
    label: 'Refunded',
    color: '#87CBB9',
  },
};
