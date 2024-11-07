import * as Yup from 'yup';

export const editAgentSchema = Yup.object().shape({
  policy: Yup.array()
    .min(1, 'Vui lòng chọn ít nhất 1 phân quyền')
    .required('Vui lòng không để trống phân quyền'),
});
