import * as yup from 'yup';

export const schemaNotifications = yup
  .object()
  .shape({
    title: yup.string().required('Vui lòng nhập tiêu đề'),
    type: yup.string().required('Vui lòng chọn loại thông báo'),
    content: yup.string().required('Vui lòng nhập thông tin'),
    shortContent: yup.string().required('Vui lòng nhập thông tin'),
    // deepLink: yup.string().required('Vui lòng nhập thông tin'),
    timeSent: yup.string().required('Vui lòng nhập thông tin'),

    groupUserIds: yup
      .array()
      .of(yup.number())
      .min(1, 'Vui lòng chọn nhóm người dùng')
      .required('Vui lòng chọn nhóm người dùng'),
  })
  .required();

export const schemaEditNotifications = yup
  .object()
  .shape({
    title: yup.string().required('Vui lòng nhập tiêu đề'),
    type: yup.string().required('Vui lòng chọn loại thông báo'),
    content: yup.string().required('Vui lòng nhập thông tin'),
    shortContent: yup.string().required('Vui lòng nhập thông tin'),
    // deepLink: yup.string().required('Vui lòng nhập thông tin'),
    timeSent: yup.string().required('Vui lòng nhập thông tin'),
  })
  .required();
