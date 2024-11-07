import * as Yup from 'yup';

export const EditTermSchema = Yup.object().shape({
  productAttributeId: Yup.object().shape({
    id: Yup.number().required('Vui lòng chọn 1 thuộc tính'),
    name: Yup.string().required('Vui lòng chọn 1 thuộc tính'),
  }),
  term: Yup.string().required('Vui lòng không bỏ trống Giá trị thuộc tính'),
  term2: Yup.string().when('another', {
    is: true,
    then: Yup.string().required('Vui lòng không bỏ trống Giá trị thuộc tính'),
    otherwise: Yup.string(),
  }),
});
