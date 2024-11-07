import { Container } from '@mui/material';
import Page from 'src/common/components/Page';
import useSettings from 'src/common/hooks/useSettings';
import RequestTableForm from '../../request-management/request-list/components/request-table/RequestTableForm';
import { useTranslation } from 'react-i18next';
import NotificationListHeader from './components/NotiListHeader';
import NotificationsTableForm from './components/NotiTableForm';

export default function TierRankList() {
  const { themeStretch } = useSettings();
  const { t } = useTranslation();
  return (
    <Page title={t('notificationManage.list.title')}>
      <Container maxWidth={themeStretch ? 'sm' : 'xl'}>
        <NotificationListHeader />
        <NotificationsTableForm />
      </Container>
    </Page>
  );
}
