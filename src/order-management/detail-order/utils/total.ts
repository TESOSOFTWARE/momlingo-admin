export const total = (arr: number[] | undefined) => {
  if (arr === undefined) return 0;
  else return arr.reduce((prev, curr) => (prev += curr), 0);
};
