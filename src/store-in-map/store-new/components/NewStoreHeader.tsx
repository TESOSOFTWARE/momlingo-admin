import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import HeaderBreadcrumbs from '../../../common/components/HeaderBreadcrumbs';
import { BREADCUMBS } from '../../../common/constants/common.constants';
import { PATH_DASHBOARD } from '../../../common/routes/paths';

export default function NewStoreHeader() {
  const { t } = useTranslation();
  return (
    <>
      <HeaderBreadcrumbs
        heading={t('storeInMap.new.title')}
        links={[
          { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
          { name: BREADCUMBS.LIST_STORE_IN_MAP, href: PATH_DASHBOARD.storeInMap.list },
          { name: t('storeInMap.new.title') },
        ]}
      />
    </>
  );
}
