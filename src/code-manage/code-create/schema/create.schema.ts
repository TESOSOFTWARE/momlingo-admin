import * as Yup from 'yup';
import en from '../../../common/locales/en';

export const CodePostSchema = Yup.object().shape({
  eventId: Yup.mixed().required(en.yupCreateCode.eventId),
  amount: Yup.number()
    .typeError(en.yupCreateCode.amountType)
    .required(en.yupCreateCode.amountRequire)
    .moreThan(0, en.yupCreateCode.amountMoreThan),
  useTime: Yup.number()
    .typeError(en.yupCreateCode.useTimeType)
    .required(en.yupCreateCode.useTimeRequire)
    .moreThan(0, en.yupCreateCode.useTimeMoreThan),
  expiresAt: Yup.date()
    .nullable()
    .transform((curr, orig) => (orig === '' ? null : curr))
    .required(en.yupCreateCode.exepiresAtRequire)
    .typeError(en.yupCreateCode.exepiresAtType),
});
