import * as Yup from 'yup';
const MAX_DESCRIPTION_LENGTH = 100000;
export const NewVariantSchema = Yup.object().shape({
  name: Yup.string().required('Vui lòng không để trống tên'),
  price: Yup.number()
    .typeError('Giá sale phải là số!')
    .required('Vui lòng không để trống giá tiền'),
  quantity: Yup.number()
    .required('Vui lòng không để trống số lượng')
    .min(0, 'Số lượng phải lớn hơn 0'),
  photoURL: Yup.mixed().required('Vui lòng tải ảnh lên'),
  point: Yup.number()
    .typeError('Điểm phải là số!')
    .required('Vui lòng không để trống điểm'),
  width: Yup.number()
    .typeError('Chiều rộng phải là số!')
    .required('Vui lòng không để trống chiều rộng'),
  height: Yup.number()
    .typeError('Chiều cao phải là số!')
    .required('Vui lòng không để trống chiều cao'),
  length: Yup.number()
    .typeError('Chiều dài phải là số!')
    .required('Vui lòng không để trống chiều dài'),
  weight: Yup.number()
    .typeError('Cân nặng phải là số!')
    .required('Vui lòng không để trống cân nặng'),
  descriptionVariant: Yup.string()
    .required('Vui lòng không để trống mô tả')
    .max(
      MAX_DESCRIPTION_LENGTH,
      `Mô tả không được vượt quá ${MAX_DESCRIPTION_LENGTH} ký tự`
    ),
  langVariant: Yup.string().required('Vui lòng chọn ít nhất 1 ngôn ngữ'),
  salePrice: Yup.number()
    .transform((cv, ov) => (ov === '' ? 0 : cv))
    .typeError('Giá sale phải là số'),
  salePoint: Yup.number()
    .transform((cv, ov) => (ov === '' ? 0 : cv))
    .typeError('điểm sale phải là số'),
});
