import Page from '../../common/components/Page';
import NewsNewForm from './components/NewsNewForm';
import NewsNewHeader from './components/NewsNewHeader';

export default function NewsNew() {
  return (
    <Page title="Tạo mới tin tức">
      <NewsNewHeader />
      <NewsNewForm />
    </Page>
  );
}
