import HeaderBreadcrumbs from '../../common/components/HeaderBreadcrumbs';
import { BREADCUMBS } from '../../common/constants/common.constants';
import { Stack, Button, Container } from '@mui/material';
import { PATH_DASHBOARD } from '../../common/routes/paths';
import EditConfigPlayTimeForm from './components/EditConfigForm';
import Page from '../../common/components/Page';
import useSettings from '../../common/hooks/useSettings';
import { useTranslation } from 'react-i18next';
export default function CreateConfigPlayTime() {
  const { themeStretch } = useSettings();
  const { t } = useTranslation();
  return (
    <Page title="Chỉnh sửa cấu hình trò chơi">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading={'Chỉnh sửa cấu hình trò chơi'}
          links={[
            {
              name: t('configPlayTime.list.title'),
              href: PATH_DASHBOARD.configPlayTime.list,
            },
            {
              name: 'Chỉnh sửa cấu hình trò chơi',
              href: PATH_DASHBOARD.configPlayTime.edit,
            },
          ]}
        />
        <EditConfigPlayTimeForm />
      </Container>
    </Page>
  );
}
