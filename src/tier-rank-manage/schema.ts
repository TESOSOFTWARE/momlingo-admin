import * as yup from 'yup';
export const schemaTierRank = (dataList: any) => {
  const validate = yup
    .object()
    .shape({
      name: yup.string().required('Vui lòng nhập thông tin'),
      description: yup.string().required('Vui lòng nhập thông tin'),
      code: yup.string().required('Vui lòng nhập thông tin'),
      conditionPoint: yup.number().required('Vui lòng nhập thông tin'),
      nextTierCode: yup.string().required('Vui lòng nhập thông tin'),
      descriptionMember: yup.string().required('Vui lòng nhập thông tin'),
      maxPoint: yup
        .number()
        .min(yup.ref('conditionPoint'), 'Tối đa điểm thứ hạng >= Điều kiện điểm')
        .when('nextTierCode', (nextTierCode, field) => {
          const test = dataList.items.find((item: any) => {
            return item?.name.toUpperCase() === nextTierCode;
          });
          return field.test(
            'link',
            'Điểu tối đa của thứ hạng <= Điểu kiện đạt của hạng tiếp theo ',
            (value: number) => {
              if (value > test?.conditionPoint) {
                return false;
              }
              return true;
            }
          );
        }),
    })
    .required();
  return validate;
};
