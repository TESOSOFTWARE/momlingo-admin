import { useTranslation } from 'react-i18next';
import HeaderBreadcrumbs from '../../../common/components/HeaderBreadcrumbs';
import { BREADCUMBS } from '../../../common/constants/common.constants';
import { PATH_DASHBOARD } from '../../../common/routes/paths';

export default function EditAgentHeader() {
  const { t } = useTranslation();
  return (
    <HeaderBreadcrumbs
      heading={t('manageAgent.edit.tittle')}
      links={[
        { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
        { name: t('manageAgent.navTitle'), href: PATH_DASHBOARD.manageAgent.root },
        { name: t('manageAgent.edit.tittle') },
      ]}
    />
  );
}
