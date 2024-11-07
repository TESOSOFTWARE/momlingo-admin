import { useTranslation } from 'react-i18next';
import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import { BREADCUMBS } from 'src/common/constants/common.constants';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import en from '../../../common/locales/en';
export default function CodeCreateHeader() {
  const { t } = useTranslation();
  return (
    <>
      <HeaderBreadcrumbs
        heading={t('titleCodeCreate')}
        links={[
          { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
          { name: BREADCUMBS.CODE_CREATE, href: PATH_DASHBOARD.code.create },
          { name: t('create') },
        ]}
      />
    </>
  );
}
