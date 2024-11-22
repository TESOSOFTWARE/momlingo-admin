import Page from '../../common/components/Page';
import EditSubjectForm from './components/EditSubjectForm';
import EditSubjectHeader from './components/EditSubjectHeader';

function NewsSubjectEdit() {
  return (
    <Page title="Chỉnh sửa chủ đề">
      <EditSubjectHeader />
      <EditSubjectForm />
    </Page>
  );
}

export default NewsSubjectEdit;
