import HeaderBreadcrumbs from '../../../common/components/HeaderBreadcrumbs';
import { BREADCUMBS } from '../../../common/constants/common.constants';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import vn from '../../../common/locales/vn';

export default function NewsEditHeader() {
  return (
    <>
      <HeaderBreadcrumbs
        heading={vn.news.edit.title}
        links={[
          { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
          { name: BREADCUMBS.NEWS_VN, href: PATH_DASHBOARD.news.list },
          { name: vn.news.list.title, href: PATH_DASHBOARD.news.list },
          { name: vn.news.edit.title },
        ]}
      />
    </>
  );
}
