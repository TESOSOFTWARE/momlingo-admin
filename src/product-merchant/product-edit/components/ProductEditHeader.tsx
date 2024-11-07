import HeaderBreadcrumbs from '../../../common/components/HeaderBreadcrumbs';
import { BREADCUMBS } from '../../../common/constants/common.constants';
import en from '../../../common/locales/en';
import { PATH_DASHBOARD } from '../../../common/routes/paths';

export default function ProductEditHeader() {
  return (
    <>
      <HeaderBreadcrumbs
        heading={en.EditProduct.title}
        links={[
          { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
          { name: BREADCUMBS.PRODUCT_EDIT },
          { name: en.EditProduct.edit },
        ]}
      />
    </>
  );
}
