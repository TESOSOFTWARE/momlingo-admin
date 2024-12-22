import * as Yup from 'yup';

export const EditCategorySchema = Yup.object().shape({
  lang: Yup.string().required('Vui lòng chọn một ngôn ngữ'),
  desc: Yup.string().required('Vui lòng thêm mô tả'),
  name: Yup.string().required('Vui lòng không bỏ trống tên'),
  // slug: Yup.string().required('Vui lòng không bỏ trống slug'),
  gender: Yup.string().required('Vui lòng không bỏ trống giới tính'),
});
