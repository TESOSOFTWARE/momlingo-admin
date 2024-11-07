import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import { BREADCUMBS } from 'src/common/constants/common.constants';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import vn from '../../../common/locales/vn';

export default function NewPointHeader() {
  return (
    <HeaderBreadcrumbs
      heading={vn.ConfigPoint.New.title}
      links={[
        { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
        { name: vn.ConfigPoint.New.titleNav, href: PATH_DASHBOARD.point.root },
        { name: vn.ConfigPoint.New.titleNew, href: PATH_DASHBOARD.point.list },
      ]}
    />
  );
}
