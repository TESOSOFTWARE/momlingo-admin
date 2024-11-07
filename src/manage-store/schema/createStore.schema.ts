import * as Yup from 'yup';
import i18n from 'src/common/locales/i18n';

export const CreateStoreSchema = Yup.object().shape({
  code: Yup.string()
    .required(i18n.t('manage_store.create.code_required'))
    .max(20, i18n.t('manage_store.create.code_max')),
  name: Yup.string().required(i18n.t('manage_store.create.name')),
  address: Yup.string().required(i18n.t('manage_store.create.address_required')),
  phoneNumber: Yup.string()
    .required(i18n.t('manage_store.create.phone_required'))
    .matches(/^[0-9]+$/, i18n.t('manage_store.create.referral_code_invalidType'))
    .max(10, i18n.t('manage_store.create.phone_max')),
  referralCode: Yup.string()
    .required(i18n.t('manage_store.create.referral_code_required'))
    .matches(/^[0-9]+$/, i18n.t('manage_store.create.referral_code_invalidType'))
    .max(9, i18n.t('manage_store.create.referral_code_max')),
});
