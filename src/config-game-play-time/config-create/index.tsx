import HeaderBreadcrumbs from '../../common/components/HeaderBreadcrumbs';
import { BREADCUMBS } from '../../common/constants/common.constants';
import { Stack, Button, Container } from '@mui/material';
import { PATH_DASHBOARD } from '../../common/routes/paths';
import ConfigPlayTimeForm from './components/ConfigForm';
import Page from '../../common/components/Page';
import useSettings from '../../common/hooks/useSettings';
import { useTranslation } from 'react-i18next';
export default function CreateConfigPlayTime() {
  const { themeStretch } = useSettings();
  const { t } = useTranslation();
  return (
    <Page title={t('configPlayTime.create.title')}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading={t('configPlayTime.create.title')}
          links={[
            {
              name: t('configPlayTime.list.title'),
              href: PATH_DASHBOARD.configPlayTime.list,
            },
            {
              name: t('configPlayTime.create.title'),
              href: PATH_DASHBOARD.configPlayTime.create,
            },
          ]}
        />
        <ConfigPlayTimeForm />
      </Container>
    </Page>
  );
}
