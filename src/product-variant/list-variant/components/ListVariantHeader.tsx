import HeaderBreadcrumbs from '../../../common/components/HeaderBreadcrumbs';
import { BREADCUMBS } from '../../../common/constants/common.constants';
import en from '../../../common/locales/en';
import { PATH_DASHBOARD } from '../../../common/routes/paths';

export default function ListVariantHeader() {
  return (
    <>
      <HeaderBreadcrumbs
        heading={'Danh sách biến thể'}
        links={[
          { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
          { name: 'Biến thể sản phẩm', href: PATH_DASHBOARD.product_variant.root },
          { name: 'Danh sách biến thể' },
        ]}
      />
    </>
  );
}
