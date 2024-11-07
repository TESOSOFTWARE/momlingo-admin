import * as Yup from 'yup';
import i18n from 'src/common/locales/i18n';

export const groupPolicySchema = Yup.object().shape({
  name: Yup.string().required(i18n.t('group_policy.schema.required')),
  description: Yup.string().required(i18n.t('group_policy.schema.required')),
  policyIds: Yup.array().min(1, i18n.t('group_policy.schema.min')),
});
