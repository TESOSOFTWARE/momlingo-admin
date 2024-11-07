import * as Yup from 'yup';

export const schemaGroupUser = Yup.object().shape({
  nameGroup: Yup.string().required('Vui lòng nhập thông tin'),
  status: Yup.boolean().required('Vui lòng nhập thông tin'),
  description: Yup.string().required('Vui lòng nhập thông tin'),
  ids: Yup.array()
    .of(Yup.number())
    .when('isCheckAll', (type, field) => {
      if (!type)
        return field
          .min(1, 'Vui lòng chọn người dùng')
          .required('Vui lòng chọn người dùng');
    }),
});
