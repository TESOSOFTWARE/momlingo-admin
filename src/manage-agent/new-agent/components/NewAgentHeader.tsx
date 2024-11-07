import { useTranslation } from 'react-i18next';
import HeaderBreadcrumbs from '../../../common/components/HeaderBreadcrumbs';
import { BREADCUMBS } from '../../../common/constants/common.constants';
import { PATH_DASHBOARD } from '../../../common/routes/paths';

export default function NewAgentHeader() {
  const { t } = useTranslation();
  return (
    <HeaderBreadcrumbs
      heading={t('manageAgent.new.title')}
      links={[
        { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
        { name: t('manageAgent.navTitle'), href: PATH_DASHBOARD.manageAgent.root },
        { name: t('manageAgent.new.title') },
      ]}
    />
  );
}
