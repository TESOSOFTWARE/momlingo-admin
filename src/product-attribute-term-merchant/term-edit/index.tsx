import { Container } from '@mui/material';
import useSettings from '../../common/hooks/useSettings';
import TermEditForm from './components/TermEditForm';
import TermEditHeader from './components/TermEditHeader';

export default function index() {
  const { themeStretch } = useSettings();
  return (
    <Container maxWidth={themeStretch ? false : 'lg'}>
      <TermEditHeader />
      <TermEditForm />
    </Container>
  );
}
