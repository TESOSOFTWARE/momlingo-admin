import HeaderBreadcrumbs from '../../../common/components/HeaderBreadcrumbs';
import { BREADCUMBS } from '../../../common/constants/common.constants';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import vn from '../../../common/locales/vn';
import i18n from 'src/common/locales/i18n';

export default function ConfigFeatureHeader() {
  return (
    <>
      <HeaderBreadcrumbs
        heading={`${i18n.t('featureConfig.title')}`}
        links={[
          { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
          {
            name: i18n.t('featureConfig.title'),
            href: PATH_DASHBOARD.configFeature.list,
          },
          { name: i18n.t('featureConfig.list') },
        ]}
      />
    </>
  );
}
