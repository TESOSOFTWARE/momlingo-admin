import dayjs from 'dayjs';

export const checkAndConvertDate = (date: string | undefined | null) => {
  if (date) {
    const newDate = new Date(date) as Date;
    return newDate.toISOString();
  }
};

export const formatDay_DMY = (value: string) => {
  return dayjs(value).format('MM/DD/YYYY HH:mm:ss');
};
