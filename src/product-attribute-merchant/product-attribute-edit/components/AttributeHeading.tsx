import { useTranslation } from 'react-i18next';
import HeaderBreadcrumbs from '../../../common/components/HeaderBreadcrumbs';
import { BREADCUMBS } from '../../../common/constants/common.constants';
import vn from '../../../common/locales/vn';
import { PATH_DASHBOARD } from '../../../common/routes/paths';

export default function AttributeHeading() {
  const { t } = useTranslation();
  return (
    <>
      <HeaderBreadcrumbs
        heading={t('attribute.edit.titleEdit')}
        links={[
          { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
          { name: BREADCUMBS.ATTRIBUTE, href: PATH_DASHBOARD.product_attribute.root },
          {
            name: BREADCUMBS.ATTRIBUTE_LIST,
            href: PATH_DASHBOARD.product_attribute.list,
          },
          { name: t('attribute.edit.titleEdit') },
        ]}
      />
    </>
  );
}
