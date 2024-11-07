import * as Yup from 'yup';
import i18n from 'src/common/locales/i18n';

export const newAgentSchema = Yup.object().shape({
  email: Yup.string().email().required(i18n.t('manageAgent.new.emailSchema')),
  newPassword: Yup.string()
    .min(6, i18n.t('manageAgent.new.newPasswordMinSchema'))
    .required(i18n.t('manageAgent.new.newPasswordMinSchema')),
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref('newPassword'), null],
      i18n.t('manageAgent.new.confirmPasswordSchema')
    )
    .required(i18n.t('manageAgent.new.confirmPasswordRequired')),
  groupPolicyIds: Yup.array()
    .min(1, 'Vui lòng chọn ít nhất 1 phân quyền')
    .required(i18n.t('manageAgent.new.groupPolicyIdsSchema')),
});
