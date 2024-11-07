import vn from 'src/common/locales/vn';
import * as Yup from 'yup';

export const schemaExportRefundOrder = Yup.object().shape({
  startDate: Yup.string().required('Vui lòng chọn ngày bắt đầu'),
  endDate: Yup.string().required('Vui lòng chọn ngày kết thúc'),
});
