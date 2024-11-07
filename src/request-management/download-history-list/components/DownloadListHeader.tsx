import { Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import Iconify from 'src/common/components/Iconify';
import { BREADCUMBS } from 'src/common/constants/common.constants';
import vn from 'src/common/locales/vn';
import { PATH_DASHBOARD } from 'src/common/routes/paths';

export default function DownloadListHeader() {
  return (
    <>
      <HeaderBreadcrumbs
        heading={vn.requestManagement.historyDownload.list}
        links={[
          { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
          { name: BREADCUMBS.REQUEST, href: PATH_DASHBOARD.requestManage.list },
          { name: vn.requestManagement.historyDownload.list },
        ]}
      />
    </>
  );
}
