import dayjs from 'dayjs';

// ------------------------------------------------
export function fDayDMY(fday: string | number | undefined) {
  return dayjs(fday).format('DD-MM-YYYY');
}

export function fDayDMY_HMA(fday: string | number | undefined) {
  return dayjs(fday).format('DD-MM-YYYY HH:mm A');
}
