export const checkAndConvertDate = (date: string | undefined | null) => {
  if (date) {
    const newDate = new Date(date) as Date;
    return newDate.toISOString();
  }
};
