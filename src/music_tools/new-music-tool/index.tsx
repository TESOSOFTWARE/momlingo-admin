import { Container } from '@mui/material';
import Page from '../../common/components/Page';
import useSettings from '../../common/hooks/useSettings';
import NewCategoryForm from './components/NewCategoryForm';
import NewCategoryHeader from './components/NewCategoryHeader';
import { useTranslation } from 'react-i18next';

export default function index() {
  const { themeStretch } = useSettings();
  const { t } = useTranslation();

  return (
    <Page title={t('category.new.title')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <NewCategoryHeader />
        <NewCategoryForm />
      </Container>
    </Page>
  );
}
