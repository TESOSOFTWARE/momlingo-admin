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
        heading="Thêm bài hát mới"
        links={[
          { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
          // { name: t('category.new.title'), href: PATH_DASHBOARD.category.root },
          // { name: t('category.new.title') },
          { name: 'Thêm bài hát mới', href: PATH_DASHBOARD.musicTool.root },
          { name: 'Thêm bài hát' },
        ]}
      />
    </>
  );
}
