import * as yup from 'yup';
import i18n from 'src/common/locales/i18n';

export const editWheelSchema = yup.object().shape({
  editWheelName: yup.string().required(i18n.t('errorMessageRequiredForWheelName')),
  editEndDateWheel: yup.date().typeError(i18n.t('isNotValidDate')),
  editStartDateWheel: yup.date().typeError(i18n.t('isNotValidDate')),
});
