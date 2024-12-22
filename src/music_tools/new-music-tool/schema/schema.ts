import * as Yup from 'yup';

export const NewCategorySchema = Yup.object().shape({
  name: Yup.string().required('Vui lòng không bỏ trống tên'),
  artist: Yup.string().required('Vui lòng không bỏ trống tác giả'),
  description: Yup.string().required('Vui lòng thêm mô tả'),
  // categoryId : Yup.string().required('Vui lòng không bỏ kho nhạc'),
});
