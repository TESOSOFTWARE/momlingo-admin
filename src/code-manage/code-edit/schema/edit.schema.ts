import * as Yup from 'yup';
import en from '../../../common/locales/en';

export const CodeEditSchema = Yup.object().shape({
  status: Yup.string().required(en.yupStatus),
  useTime: Yup.number()
    .typeError(en.yupUseTimeType)
    .required(en.yupUseTimeRequired)
    .moreThan(-1, en.yupUseTimeNumer),
});
