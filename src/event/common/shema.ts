import * as yup from 'yup';

export const schemaCreateEvent = yup
  .object()
  .shape({
    name: yup
      .string()
      .required('Vui lòng nhập thông tin')
      .test('len', 'Tối đa 152 ký tự', (val: any) => val.length < 153),
    type: yup.string().required('Vui lòng chọn loại sự kiện'),
    systemConfigPointIds: yup
      .array()
      .of(yup.object().required('Vui lòng chọn sản phẩm áp dụng'))
      .min(1, 'Chọn tối thiểu một sản phẩm'),
    startDate: yup.date().typeError('Vui lòng nhập thông tin vào ô trống'),
    endDate: yup
      .date()
      .typeError('Vui lòng nhập thông tin vào ô trống')
      .min(yup.ref('startDate'), 'Ngày kết thúc không thể trước ngày bắt đầu'),
    eventReward: yup.object().shape({
      type: yup.string().required('Vui lòng nhập thông tin'),
      value: yup
        .number()
        .min(1, 'Giá trị tối thiểu là 1')
        .typeError('Vui lòng nhập thông tin')
        .required('Vui lòng nhập thông tin'),
    }),
  })
  .required();
