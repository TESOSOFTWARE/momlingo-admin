import HeaderBreadcrumbs from '../../../common/components/HeaderBreadcrumbs';
import { BREADCUMBS } from '../../../common/constants/common.constants';
import vn from '../../../common/locales/vn';
import { PATH_DASHBOARD } from '../../../common/routes/paths';

export default function DetailHeader() {
  return (
    <>
      <HeaderBreadcrumbs
        heading={vn.DetailProduct.title}
        links={[
          { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
          { name: BREADCUMBS.PRODUCT_LIST_VN, href: PATH_DASHBOARD.product.list },
          { name: vn.DetailProduct.detail },
        ]}
      />
    </>
  );
}
