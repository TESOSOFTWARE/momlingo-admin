import Page from '../../common/components/Page';
import ListSubjectHeader from './components/listSubjectHeader';
import SubjectTable from './components/subject-table/subjectTable';

function ListSubject() {
  return (
    <Page title="Chủ đề">
      <ListSubjectHeader />
      <SubjectTable />
    </Page>
  );
}

export default ListSubject;
