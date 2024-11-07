import { Container } from '@mui/material';
import Page from 'src/common/components/Page';
import useSettings from 'src/common/hooks/useSettings';
import RequestTableForm from '../../request-management/request-list/components/request-table/RequestTableForm';
import RequestListHeader from '../../request-management/request-list/components/RequestListHeader';
import { useTranslation } from 'react-i18next';

export default function RequestList() {
  const { themeStretch } = useSettings();
  const { t } = useTranslation();

  return (
    <Page title={t('requestManagement.list')}>
      <Container maxWidth={themeStretch ? 'sm' : 'xl'}>
        <RequestListHeader />
        <RequestTableForm />
      </Container>
    </Page>
  );
}
