import Page from '../../common/components/Page';
import NewsListHeader from './components/NewsListHeader';
import NewsTable from './components/news-table/NewsTable';

export default function NewsList() {
  return (
    <Page title="Danh sách tin tức">
      <NewsListHeader />
      <NewsTable />
    </Page>
  );
}
