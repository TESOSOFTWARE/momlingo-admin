import { useTranslation } from 'react-i18next';
import HeaderBreadcrumbs from '../../../common/components/HeaderBreadcrumbs';
import { BREADCUMBS } from '../../../common/constants/common.constants';
import { PATH_DASHBOARD } from '../../../common/routes/paths';

export default function NewCategoryHeader() {
  const { t } = useTranslation();
  return (
    <>
      <HeaderBreadcrumbs
        // heading={t('childName.new.title')}
        heading="Thêm tên mới"
        links={[
          { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
          // { name: t('category.new.title'), href: PATH_DASHBOARD.category.root },
          // { name: t('category.new.title') },
          { name: 'Thêm tên mới', href: PATH_DASHBOARD.category.root },
          { name: 'Thêm tên' },
        ]}
      />
    </>
  );
}