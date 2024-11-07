import { Container, Button, Tabs, Tab } from '@mui/material';
import Page from '../../common/components/Page';
import HeaderBreadcrumbs from '../../common/components/HeaderBreadcrumbs';
import { BREADCUMBS } from '../../common/constants/common.constants';
import { PATH_DASHBOARD } from '../../common/routes/paths';
import useSettings from '../../common/hooks/useSettings';
import i18n from 'src/common/locales/i18n';
import ListRefundedOrderDashBoard from './components/RefundedOrderDashboard';
import { useTranslation } from 'react-i18next';
import { IsOpenModalExportSelector, setCloseRedirectModal, setIsOpenModalExport } from './refunded.slice';
import { RefundExportModal } from './components/ModalExport';
import { ConfirmModal } from '../../common/components/modal/ConfirmModal';
import { useSelector, useDispatch } from '../../common/redux/store';

export default function ListOrderRefund() {
  const { themeStretch } = useSettings();
  const dispatch= useDispatch();
  const { t } = useTranslation();
  const handleExport = () => {
    dispatch(setIsOpenModalExport(true));
  };
  const { redirectModal } = useSelector(state => state.refundedOrder);
  
  const isOpenModalExport = useSelector(IsOpenModalExportSelector);

  const handleCloseRedirectModal = () => {
    dispatch(setCloseRedirectModal());
  }
   return (
    <Page title={i18n.t('order.detail.refund')}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading={i18n.t('order.detail.refundForm.list')}
          links={[
            {
              name: `${i18n.t('order.detail.refund')}`,
              href: '',
            },
            {
              name: `${i18n.t('order.detail.refundForm.list')}`,
              href: '',
            },
          ]}
          action={
            <Button variant="contained" onClick={handleExport}>
              {t('order.detail.export')}
            </Button>
          }
        />
        <ListRefundedOrderDashBoard />
      </Container>
      <RefundExportModal
        isOpen= {isOpenModalExport}
        onClose={() => dispatch(setIsOpenModalExport(false))}
      />
      <ConfirmModal
        isOpen={redirectModal.isOpen}
        onClose={handleCloseRedirectModal}
        onSubmit={redirectModal.callback}
        type={'warning'}
        text={redirectModal.text}
      />
    </Page>
  );
}
