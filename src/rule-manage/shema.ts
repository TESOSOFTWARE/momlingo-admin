import vn from 'src/common/locales/vn';
import * as Yup from 'yup';

export const schemaChangeRuleConfig = Yup.object().shape({
  name: Yup.string().required('Vui lòng nhập thông tin').max(256, 'Tối đa 256 kí tự'),
  status: Yup.boolean().required('Vui lòng nhập thông tin'),
});
