import * as Yup from 'yup';
import vn from '../../../common/locales/vn';
const MAX_DESCRIPTION_LENGTH = 100000;
export const NewProductSchema = Yup.object().shape({
  name: Yup.string().required(vn.productMerchant.new.schemaName),
  shortDescription: Yup.string().required(vn.productMerchant.new.schemaShortDescription),
  description: Yup.string()
    .required(vn.productMerchant.new.schemaDescription)
    .max(
      MAX_DESCRIPTION_LENGTH,
      `Mô tả không được vượt quá ${MAX_DESCRIPTION_LENGTH} ký tự`
    ),
  categoryIds: Yup.array()
    .min(1, vn.productMerchant.new.schemaCategoryMin)
    .required(vn.productMerchant.new.schemaCategory),
  photoURL: Yup.mixed().required(vn.productMerchant.new.schemaImage),
  addForm: Yup.string().required('Vui lòng không để trống dòng này'),
});
