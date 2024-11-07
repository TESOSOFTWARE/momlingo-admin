import * as Yup from 'yup';
import vn from '../../../common/locales/vn';

export const PutProductAttributeSchema = Yup.object().shape({
  name: Yup.string().required(vn.attribute.edit.schemaName),
  description: Yup.string().required(vn.attribute.edit.schemaDescription),
});
