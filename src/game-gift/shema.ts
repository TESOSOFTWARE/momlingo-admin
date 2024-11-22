import * as yup from 'yup';
import { isValidURL } from '../common/constants/common.utils';
import { DEFAULT_TYPE_PRIZE, TypeGameConstraints } from './constants';

export const schemaCreateGameGift = yup
  .object()
  .shape({
    typePrize: yup.string(),
    name: yup.string().when('typePrize', (type, field) => {
      if (type === DEFAULT_TYPE_PRIZE[1].value)
        return field
          .required('Vui lòng nhập thông tin')
          .test('len', 'Tối đa 152 ký tự', (val: any) => val.length < 153);
    }),
    productId: yup
      .object()
      .nullable()
      .when('typePrize', (type, field) => {
        if (type === 'prizeAvailable') {
          return field.required('Vui lòng chọn sản phẩm');
        }
      }),
    productVariantId: yup
      .object()
      .nullable()
      .when('productId', (type, field) => {
        if (type) {
          return field.required('Vui lòng nhập thông tin');
        }
      }),

    imageId: yup.mixed().when('typePrize', (type, field) => {
      if (type === DEFAULT_TYPE_PRIZE[1].value)
        return field.required('Vui lòng nhập thông tin');
    }),
    ordinal: yup
      .number()
      .typeError('Vui lòng nhập thông tin')
      .when('type', (type, field) => {
        if (type !== TypeGameConstraints.DEFAULT)
          return field.required('Vui lòng nhập thông tin');
      })
      .when('type', (type, field) => {
        return field.test('minOne', 'Thứ tự ưu tiên lớn hơn 1', (value: number) => {
          if (type !== TypeGameConstraints.DEFAULT && value < 1) {
            return false;
          }
          return true;
        });
      }),
    winRate: yup
      .number()
      .typeError('Vui lòng nhập thông tin')
      .when('type', (type, field) => {
        if (type === TypeGameConstraints.DEFAULT)
          return field.required('Vui lòng nhập thông tin');
      })
      .when('type', (type, field) => {
        return field.test(
          'minOneWinRate',
          'Tỉ lệ trúng giải lớn hơn 1',
          (value: number) => {
            if (type === TypeGameConstraints.DEFAULT && value < 1) {
              return false;
            }
            return true;
          }
        );
      })
      .when('type', (type, field) => {
        return field.test(
          'maxhundred',
          'Tỉ lệ trúng giải nhỏ hơn 100',
          (value: number) => {
            if (type === TypeGameConstraints.DEFAULT && value > 100) {
              return false;
            }
            return true;
          }
        );
      }),
    posInImage: yup
      .number()
      .min(1, 'Giá trị tối thiểu là 1')
      .typeError('Vui lòng nhập thông tin')
      .required('Vui lòng nhập thông tin'),
    quantity: yup
      .number()
      .min(1, 'Giá trị tối thiểu là 1')
      .typeError('Vui lòng nhập thông tin')
      .required('Vui lòng nhập thông tin'),
    startDate: yup.date().typeError('Vui lòng nhập thông tin vào ô trống'),
    endDate: yup
      .date()
      .typeError('Vui lòng nhập thông tin vào ô trống')
      .min(yup.ref('startDate'), 'Ngày kết thúc không thể trước ngày bắt đầu'),
    type: yup.string().required('Vui lòng nhập thông tin'),
    gameGiftProvinceConstraints: yup
      .array()
      // of(
      //   yup.object().shape({
      //     provinceId: yup.mixed().required('Vui lòng nhập thông tin vào ô trống'),
      //     addWinRate: yup
      //       .number()
      //       .min(1, 'Giá trị tối thiểu là 1')
      //       .typeError('Vui lòng nhập thông tin')
      //       .required('Vui lòng nhập thông tin'),
      //   })
      // ),
      .when('type', (type, field) => {
        if (type.length > 0)
          return field.of(
            yup.object().shape({
              provinceId: yup.mixed().required('Vui lòng nhập thông tin vào ô trống'),
              // addWinRate: yup
              //   .number()
              //   .min(1, 'Giá trị tối thiểu là 1')
              //   .typeError('Vui lòng nhập thông tin')
              //   .required('Vui lòng nhập thông tin'),
            })
          );
      }),
    constraintPhoneNumber: yup.array().when('type', (type, field) => {
      if (type === TypeGameConstraints.ALLOCATION)
        return field
          .of(yup.string().nullable().required('Vui lòng chọn số điện thoại'))
          .min(1, 'Chọn tối thiểu 1 số điện thoại');
    }),
    constraintProvince: yup.array().when('type', (type, field) => {
      if (type === TypeGameConstraints.PROVINCE)
        return field
          .of(yup.object().nullable().required('Vui lòng chọn tỉnh thành'))
          .min(1, 'Chọn tối thiểu 1 tỉnh/thành');
    }),
  })
  .required();
