import HeaderBreadcrumbs from '../../../common/components/HeaderBreadcrumbs';
import { BREADCUMBS } from '../../../common/constants/common.constants';
import { PATH_DASHBOARD } from '../../../common/routes/paths';

export default function OrderHeader() {
  return (
    <HeaderBreadcrumbs
      heading={'Danh sách đơn quà vật lý'}
      links={[
        { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
        { name: BREADCUMBS.ORDER_MANAGEMENT, href: PATH_DASHBOARD.order_management.root },
        { name: 'Danh sách đơn quà vật lý' },
      ]}
    />
  );
}