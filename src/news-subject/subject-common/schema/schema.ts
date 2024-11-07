import * as Yup from 'yup';

export const SubjectSchema = Yup.object().shape({
  // lang: Yup.string().required('Vui lòng chọn một ngôn ngữ'),
  name: Yup.string().required('Vui lòng không bỏ trống tên chủ đề'),
});
