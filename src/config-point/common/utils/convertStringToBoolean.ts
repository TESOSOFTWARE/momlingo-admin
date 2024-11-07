export const convertStringToBoolean = (value: string | undefined) => {
  if (value === 'true') return true;
  if (value === 'false') return false;
  else return undefined;
};
