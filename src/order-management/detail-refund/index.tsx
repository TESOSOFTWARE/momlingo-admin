import { Container } from '@mui/material';
import Page from '../../common/components/Page';
import HeaderBreadcrumbs from '../../common/components/HeaderBreadcrumbs';
import { BREADCUMBS } from '../../common/constants/common.constants';
import { PATH_DASHBOARD } from '../../common/routes/paths';
import useSettings from '../../common/hooks/useSettings';
import i18n from 'src/common/locales/i18n';
import FormRefundOrderDetail from './components/DetailRefundOrder';

export default function DetailOrderRefund() {
  const { themeStretch } = useSettings();
  return (
    <Page title={i18n.t('order.detail.refund')}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading={i18n.t('order.detail.refundForm.title')}
          links={[
            {
              name: `${i18n.t('order.detail.refund')}`,
              href: '',
            },
            {
              name: `${i18n.t('order.detail.refundForm.title')}`,
              href: '',
            },
          ]}
        />
        <FormRefundOrderDetail/>
      </Container>
    </Page>
  );
}
