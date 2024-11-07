import HeaderBreadcrumbs from '../../../common/components/HeaderBreadcrumbs';
import { BREADCUMBS } from '../../../common/constants/common.constants';
import vn from '../../../common/locales/vn';
import { PATH_DASHBOARD } from '../../../common/routes/paths';

function EditSubjectHeader() {
  return (
    <>
      <HeaderBreadcrumbs
        heading={vn.news_subject.edit.title}
        links={[
          { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
          { name: BREADCUMBS.NEWS_SUBJECT_VN, href: PATH_DASHBOARD.news_subject.edit },
          { name: vn.news_subject.edit.title },
        ]}
      />
    </>
  );
}

export default EditSubjectHeader;
