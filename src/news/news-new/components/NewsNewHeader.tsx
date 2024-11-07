import HeaderBreadcrumbs from '../../../common/components/HeaderBreadcrumbs';
import { BREADCUMBS } from '../../../common/constants/common.constants';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import vn from '../../../common/locales/vn';

export default function NewsNewHeader() {
  return (
    <>
      <HeaderBreadcrumbs
        heading={vn.news.new.title}
        links={[
          { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
          { name: BREADCUMBS.NEWS_VN, href: PATH_DASHBOARD.news.new },
          { name: vn.news.new.title },
        ]}
      />
    </>
  );
}
