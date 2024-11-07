import * as Yup from 'yup';
export const schemaHistoryScan = Yup.object().shape({});

export const schemaActiveDuplicateCode = Yup.object().shape({
  phoneNumber: Yup.string()
    .typeError('Vui lòng chọn user')
    .required('Vui lòng chọn user'),
});
