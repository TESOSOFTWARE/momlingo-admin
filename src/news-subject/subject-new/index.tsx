import Page from '../../common/components/Page';
import NewSubjectForm from './components/NewSubjectForm';
import NewSubjectHeader from './components/NewSubjectHeader';

function NewSubject() {
  return (
    <Page title='Tạo mới chủ đề'>
      <NewSubjectHeader />
      <NewSubjectForm />
    </Page>
  );
}

export default NewSubject;
