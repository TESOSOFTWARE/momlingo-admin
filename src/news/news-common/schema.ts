import * as yup from 'yup';

export const schemaNews = yup.object().shape({

    title: yup.string().required('Vui lòng nhập thông tin'),
    author: yup.string().required('Vui lòng nhập thông tin'),
    content: yup.string().required('Vui lòng nhập thông tin'),
    description: yup.string().required('Vui lòng nhập thông tin'),
    subjectIds: yup.array().of(yup.number()).min(1, 'Chọn tối thiểu 1 chủ đề').required('Vui lòng nhập thông tin'),
    image: yup.mixed().required('Vui lòng nhập ảnh'),
});
