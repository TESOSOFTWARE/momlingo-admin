import { useTranslation } from 'react-i18next';
import HeaderBreadcrumbs from '../../../common/components/HeaderBreadcrumbs';
import { BREADCUMBS } from '../../../common/constants/common.constants';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import { useSelector } from 'react-redux';
import { checkType } from '../../detail-order/slice';
import { EnumType } from '../../common/interface';

export default function EditOrderHeader() {
  const { t } = useTranslation();
  const type = useSelector(checkType);
  const checkPhysical = type === EnumType.PHYSICAL ? true : false;
  return (
    <>
      {checkPhysical ? (
        <HeaderBreadcrumbs
          heading={t('order.edit.editTitle')}
          links={[
            { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
            {
              name: BREADCUMBS.ORDER_MANAGEMENT,
              href: PATH_DASHBOARD.order_management.root
            },
            {
              name: t('order.edit.editPhysicalList'),
              href: PATH_DASHBOARD.order_management.list_physical
            },
            { name: t('order.edit.editTitle') }
          ]}
        />
      ) : (
        <HeaderBreadcrumbs
          heading={t('order.edit.editTitle')}
          links={[
            { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
            {
              name: BREADCUMBS.ORDER_MANAGEMENT,
              href: PATH_DASHBOARD.order_management.root
            },
            {
              name: t('order.edit.editVoucherList'),
              href: PATH_DASHBOARD.order_management.list_voucher
            },
            { name: t('order.edit.editTitle') }
          ]}
        />
      )}
    </>
  );
}
