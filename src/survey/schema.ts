import * as yup from 'yup';

export const schemaAddSurvey = yup
  .object()
  .shape({
    startDate: yup.date().typeError('Vui lòng nhập thông tin vào ô trống'),
    endDate: yup
      .date()
      .typeError('Vui lòng nhập thông tin vào ô trống')
      .min(yup.ref('startDate'), 'Ngày kết thúc không thể trước ngày bắt đầu'),
    point: yup
      .number()
      .typeError('Vui lòng nhập thông tin vào ô trống')
      .min(0, 'Giá trị tối thiểu là 0')
      .required('Vui lòng nhập thông tin vào ô trống'),
    name: yup.string().required('Vui lòng nhập thông tin vào ô trống'),
    description: yup.string().required('Vui lòng nhập thông tin vào ô trống'),
    questionList: yup.array().of(
      yup.object().shape({
        content: yup.string().required('Vui lòng nhập thông tin vào ô trống'),
        answerList: yup.array().of(
          yup.object().shape({
            content: yup.string().required('Vui lòng nhập thông tin vào ô trống'),
          })
        ),
      })
    ),
  })
  .required();
