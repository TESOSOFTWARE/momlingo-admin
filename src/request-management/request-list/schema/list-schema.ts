import * as Yup from 'yup';
export const ListRequestSchema = Yup.object().shape({
  startDate: Yup.string()
    .nullable()
    .typeError('Vui lòng chọn đúng định dạng ngày DD-MM-YYYY'),
  endDate: Yup.string()
    .nullable()
    .typeError('Vui lòng chọn đúng định dạng ngày DD-MM-YYYY'),
});
