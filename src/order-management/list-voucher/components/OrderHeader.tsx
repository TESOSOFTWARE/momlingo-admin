import HeaderBreadcrumbs from '../../../common/components/HeaderBreadcrumbs';
import { BREADCUMBS } from '../../../common/constants/common.constants';
import { PATH_DASHBOARD } from '../../../common/routes/paths';

export default function OrderHeader() {
  return (
    <HeaderBreadcrumbs
      heading={'Danh sách đơn quà E-voucher'}
      links={[
        { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
        { name: BREADCUMBS.ORDER_MANAGEMENT, href: PATH_DASHBOARD.order_management.root },
        { name: 'Quản lý đơn quà E-Voucher' },
      ]}
    />
  );
}
