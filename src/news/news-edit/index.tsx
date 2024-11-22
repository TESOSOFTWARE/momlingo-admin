import Page from '../../common/components/Page';
import NewsEditForm from './components/NewsEditForm';
import NewsEditHeader from './components/NewsEditHeader';

function NewsEdit() {
  return (
    <Page title="Chỉnh sửa Tin tức">
      <NewsEditHeader />
      <NewsEditForm />
    </Page>
  );
}

export default NewsEdit;
