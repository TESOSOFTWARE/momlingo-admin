import Page from '../../common/components/Page';
import NewsDetailForm from './components/NewsDetailForm';
import NewsDetailHeader from './components/NewsDetailHeader';

export default function NewsDetail() {
  return (
    <Page title="Thông tin tin tức">
      <NewsDetailHeader />
      <NewsDetailForm />
    </Page>
  );
}
