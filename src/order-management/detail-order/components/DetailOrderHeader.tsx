import { useTranslation } from 'react-i18next';
import HeaderBreadcrumbs from '../../../common/components/HeaderBreadcrumbs';
import { BREADCUMBS } from '../../../common/constants/common.constants';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import { checkType } from '../slice';
import { EnumType } from '../../common/interface';
import { useSelector } from 'react-redux';

export default function DetailOrderHeader() {
  const { t } = useTranslation();
  const type = useSelector(checkType);
  const checkPhysical = type === EnumType.PHYSICAL ? true : false;
  return (
    <>
      {checkPhysical ? (
        <HeaderBreadcrumbs
          heading={t('order.detail.orderTitle')}
          links={[
            { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
            {
              name: BREADCUMBS.ORDER_MANAGEMENT,
              href: PATH_DASHBOARD.order_management.root
            },

            {
              name: t('order.detail.headerPhysical'),
              href: PATH_DASHBOARD.order_management.list_physical
            },

            { name: t('order.detail.orderTitle') }
          ]}
        />
      ) : (
        <HeaderBreadcrumbs
          heading={t('order.detail.orderTitle')}
          links={[
            { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
            {
              name: BREADCUMBS.ORDER_MANAGEMENT,
              href: PATH_DASHBOARD.order_management.root
            },

            {
              name: t('order.detail.headerVoucher'),
              href: PATH_DASHBOARD.order_management.list_voucher
            },

            { name: t('order.detail.orderTitle') }
          ]}
        />
      )}
    </>
  );
}
