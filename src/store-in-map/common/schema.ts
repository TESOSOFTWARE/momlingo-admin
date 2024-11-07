import * as Yup from 'yup';

export const NewStoreSchema = Yup.object().shape({
  address: Yup.string().required('Vui lòng thêm mô tả'),
  name: Yup.string().required('Vui lòng không bỏ trống tên'),
  lat:Yup.number().required('Vui lòng nhập thông tin'),
  long:Yup.number().required('Vui lòng nhập thông tin'),
});
