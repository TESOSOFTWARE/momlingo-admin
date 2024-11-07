import i18n from 'src/common/locales/i18n';
import * as Yup from 'yup';

export const configPlayTimeSchema = Yup.object().shape({
  gameId: Yup.number().required(i18n.t('configPlayTime.create.schema.field_required')),
  weight: Yup.number().required(i18n.t('configPlayTime.create.schema.field_required')),
  value: Yup.number()
    .min(0.5, i18n.t('configPlayTime.create.schema.value_min'))
    .required(i18n.t('configPlayTime.create.schema.field_required')),
  productGroup: Yup.string().required(
    i18n.t('configPlayTime.create.schema.field_required')
  ),
});
