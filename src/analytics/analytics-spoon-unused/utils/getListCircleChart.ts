export const getListCircleChart = (Obj: Object) => {
  return Object.entries(Obj || {}).filter((item) => item[0] !== 'ALL');
};
