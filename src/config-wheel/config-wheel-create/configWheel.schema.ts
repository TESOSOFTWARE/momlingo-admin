import * as yup from 'yup';
import i18n from 'src/common/locales/i18n';

const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
export const configWheelSchema = yup.object().shape({
  wheelName: yup.string().required(i18n.t('errorMessageRequiredForWheelName')),
  endDateWheel: yup
    .date()
    .typeError('Date is invalid')
    .min(new Date(), 'the end date cannot be today'),
  startDateWheel: yup
    .date()
    .typeError('Date is invalid')
    .min(yesterday, 'Start date cannot in the past'),
});
