import HeaderBreadcrumbs from '../../../common/components/HeaderBreadcrumbs';
import { BREADCUMBS } from '../../../common/constants/common.constants';
import vn from '../../../common/locales/vn';
import { PATH_DASHBOARD } from '../../../common/routes/paths';

function NewSubjectHeader() {
  return (
    <>
      <HeaderBreadcrumbs
        heading={vn.news_subject.new.title}
        links={[
          { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
          { name: BREADCUMBS.NEWS_SUBJECT_VN, href: PATH_DASHBOARD.news_subject.new },
          { name: vn.news_subject.new.title },
        ]}
      />
    </>
  );
}

export default NewSubjectHeader;
