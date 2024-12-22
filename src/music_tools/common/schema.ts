import * as Yup from 'yup';

export const EditCategorySchema = Yup.object().shape({
  artist: Yup.string().required('Vui lòng thêm tác giả'),
  description: Yup.string().required('Vui lòng thêm mô tả'),
  name: Yup.string().required('Vui lòng không bỏ trống tên'),
  // audioFile: Yup.mixed().required('Vui lòng không bỏ trống file'),
});
