import * as yup from 'yup';

export const ModalRoutingBannerSchema = yup.object().shape({
  // routing: yup.string().required('Vui lòng điền tên trang bạn muốn hướng tới'),
});
export const ModalTitleNormalServiceSchema = yup.object().shape({
  title: yup.string().required('This field is required'),
});
export const ModalLinkModalService = yup.object().shape({
  nameService: yup.string().required('This field is required'),
  routing: yup.string().required('Vui lòng điền tên trang bạn muốn hướng tới'),
});
export const horizontalProductListSchema = yup.object().shape({
  maxLength: yup.string().required('This field is required'),
  titleSection: yup.string().required('This field is required'),
});
export const verticalProductListSchema = yup.object().shape({
  maxLength: yup.string().required('This field is required'),
  titleSection: yup.string().required('This field is required'),
});
