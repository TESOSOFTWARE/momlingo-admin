import { Container } from '@mui/material';
import HeaderBreadcrumbs from '../../common/components/HeaderBreadcrumbs';
import Page from '../../common/components/Page';
import useSettings from '../../common/hooks/useSettings';
import { useTranslation } from 'react-i18next';
import { useDispatch } from '../../common/redux/store';
import ListRefundOrderRequestDashBoard from './components/RefundOrderRequestDashboard';
// import ListRefundedOrderDashBoard from './components/RefundedOrderDashboard';
// import { IsOpenModalExportSelector, setCloseRedirectModal, setIsOpenModalExport } from './refunded.slice';
// import { RefundExportModal } from './components/ModalExport';

export default function ListOrderRefundRequest() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <Page title={t('order.detail.refundRequest.list')}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading={t('order.detail.refundRequest.list')}
          links={[
            {
              name: `${t('order.detail.refund')}`,
              href: '',
            },
            {
              name: t('order.detail.refundRequest.list'),
              href: '',
            },
          ]}
          // action={
          //   <Button variant="contained" onClick={handleExport}>
          //     {t('order.detail.export')}
          //   </Button>
          // }
        />
        <ListRefundOrderRequestDashBoard />
      </Container>
      {/* <RefundExportModal
        isOpen= {isOpenModalExport}
        onClose={() => dispatch(setIsOpenModalExport(false))}
      />
      <ConfirmModal
        isOpen={redirectModal.isOpen}
        onClose={handleCloseRedirectModal}
        onSubmit={redirectModal.callback}
        type={'warning'}
        text={redirectModal.text}
      /> */}
    </Page>
  );
}
