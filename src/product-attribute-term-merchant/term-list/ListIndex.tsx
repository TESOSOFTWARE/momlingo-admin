import { Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Page from '../../common/components/Page';
import useSettings from '../../common/hooks/useSettings';
import ListTermHeader from './components/ListTermHeader';
import ListTermTable from './components/ListTermTable';

export default function ListIndex() {
  const { themeStretch } = useSettings();
  const a = useSettings();
  console.log(a, 'setting');
  const { t } = useTranslation();
  return (
    <Page title={t('term.list.title')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <ListTermHeader />
        <ListTermTable />
      </Container>
    </Page>
  );
}
