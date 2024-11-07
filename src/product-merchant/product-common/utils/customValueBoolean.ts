export const customValueBoolean = (
  value: boolean,
  valueTrue: string,
  valueFalse: string
) => {
  if (value !== true) {
    return valueFalse;
  } else {
    return valueTrue;
  }
};
