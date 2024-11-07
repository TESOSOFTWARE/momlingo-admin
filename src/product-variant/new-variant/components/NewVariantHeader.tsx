import HeaderBreadcrumbs from '../../../common/components/HeaderBreadcrumbs';
import { BREADCUMBS } from '../../../common/constants/common.constants';
import { PATH_DASHBOARD } from '../../../common/routes/paths';

export default function NewVariantHeader() {
  return (
    <>
      <HeaderBreadcrumbs
        heading={'Thêm mới biến thể'}
        links={[
          { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
          { name: 'Thêm mới sản phẩm', href: PATH_DASHBOARD.product_variant.root },
          { name: 'Thêm mới' },
        ]}
      />
    </>
  );
}
