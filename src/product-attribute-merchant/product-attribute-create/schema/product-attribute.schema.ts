import * as Yup from 'yup';
import vn from '../../../common/locales/vn';

export const PostProductAttributeSchema = Yup.object().shape({
  type: Yup.string().required(vn.attribute.new.schemaType),
  lang: Yup.string().required(vn.attribute.new.schemaLang),
  name: Yup.string().required(vn.attribute.new.schemaName),
  description: Yup.string().required(vn.attribute.new.schemaDescription),
});
