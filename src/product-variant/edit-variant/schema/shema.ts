import * as Yup from 'yup';

const MAX_DESCRIPTION_LENGTH = 100000;

export const EditVariantSchema = Yup.object().shape({
  name: Yup.string().required('Vui lòng không để trống tên'),
  price: Yup.number().required('Vui lòng không để trống giá tiền'),
  sku: Yup.string().required('Vui lòng không để trống Sku'),
  quantity: Yup.number()
    .required('Vui lòng không để trống số lượng')
    .min(0, 'Số lượng phải lớn hơn 0'),
  photoURL: Yup.mixed().required('Vui lòng tải ảnh lên'),
  point: Yup.number().required('Vui lòng không để trống điểm'),
  width: Yup.number().required('Vui lòng không để trống chiều rộng'),
  height: Yup.number().required('Vui lòng không để trống chiều cao'),
  length: Yup.number().required('Vui lòng không để trống chiều dài'),
  weight: Yup.number().required('Vui lòng không để trống cân nặng'),
  descriptionVariant: Yup.string()
    .required('Vui lòng không để trống mô tả')
    .max(
      MAX_DESCRIPTION_LENGTH,
      `Mô tả không được vượt quá ${MAX_DESCRIPTION_LENGTH} ký tự`
    ),
  salePrice: Yup.number()
    .transform((cv, ov) => (ov === '' ? 0 : cv))
    .typeError('Giá sale phải là số'),
  salePoint: Yup.number()
    .transform((cv, ov) => (ov === '' ? 0 : cv))
    .typeError('điểm sale phải là số')
});
