export const renderNull = (value: string | null | undefined) => {
  if (value === null) return 'Chưa có';
  else return value;
};
