import HeaderBreadcrumbs from '../../../common/components/HeaderBreadcrumbs';
import { BREADCUMBS } from '../../../common/constants/common.constants';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import vn from '../../../common/locales/vn';
import i18n from 'src/common/locales/i18n';

export default function ConfigEventHeader() {
  return (
    <>
      <HeaderBreadcrumbs
        heading={`${i18n.t('configEvent.list')}`}
        links={[
          { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
          {
            name: i18n.t('configEvent.title'),
            href: PATH_DASHBOARD.configFeature.list,
          },
          { name: i18n.t('configEvent.list') },
        ]}
      />
    </>
  );
}
