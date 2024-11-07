import HeaderBreadcrumbs from '../../../common/components/HeaderBreadcrumbs';
import { BREADCUMBS } from '../../../common/constants/common.constants';
import { PATH_DASHBOARD } from '../../../common/routes/paths';

export default function EditVariantHeader() {
  return (
    <>
      <HeaderBreadcrumbs
        heading={'Chỉnh sửa biến thể sản phẩm'}
        links={[
          { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
          { name: 'Biến thể sản phẩm', href: PATH_DASHBOARD.product_variant.root },
          { name: 'Chỉnh sửa' },
        ]}
      />
    </>
  );
}
