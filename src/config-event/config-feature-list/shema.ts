import vn from 'src/common/locales/vn';
import * as Yup from 'yup';

export const schemaChangeEventConfig = Yup.object().shape({
  desc: Yup.string().required('Vui lòng nhập thông tin').max(256, 'Tối đa 256 kí tự'),
  status: Yup.boolean().required('Vui lòng nhập thông tin'),
  startDate: Yup.date().typeError('Vui lòng nhập thông tin vào ô trống'),
  endDate: Yup
    .date()
    .typeError('Vui lòng nhập thông tin vào ô trống')
    .min(Yup.ref('startDate'), 'Ngày kết thúc không thể trước ngày bắt đầu'),
});
