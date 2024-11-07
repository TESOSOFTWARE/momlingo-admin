export const removeUndefined = (value: any) => {
  if (typeof value !== 'undefined') return value;
  else return [];
};
