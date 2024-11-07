import HeaderBreadcrumbs from '../../../common/components/HeaderBreadcrumbs';
import { BREADCUMBS } from '../../../common/constants/common.constants';
import vn from '../../../common/locales/vn';
import { PATH_DASHBOARD } from '../../../common/routes/paths';

export default function EditPointHeader() {
  return (
    <HeaderBreadcrumbs
      heading={vn.ConfigPoint.Edit.title}
      links={[
        { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
        { name: vn.ConfigPoint.New.titleNav, href: PATH_DASHBOARD.point.root },
        { name: vn.ConfigPoint.List.title, href: PATH_DASHBOARD.point.list },
        { name: vn.ConfigPoint.Edit.edit },
      ]}
    />
  );
}
