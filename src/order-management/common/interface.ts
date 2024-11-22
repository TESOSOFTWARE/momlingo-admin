export interface ICallback {
  onSuccess?: VoidFunction;
  onError?: VoidFunction;
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  ON_HOLD = 'ON_HOLD',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED',
  FAILED = 'FAILED',
  TRASH = 'TRASH',
}

export enum EnumType {
  VOUCHER = 'VOUCHER',
  PHYSICAL = 'PHYSICAL',
}

export interface IStatusOrderGift {
  [key: string]: {
    label: string;
    color: string;
  };
}
