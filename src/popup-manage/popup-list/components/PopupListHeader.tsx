import { Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import Iconify from 'src/common/components/Iconify';
import { BREADCUMBS } from 'src/common/constants/common.constants';
import vn from 'src/common/locales/vn';
import { PATH_DASHBOARD } from 'src/common/routes/paths';

export default function PopupListHeader() {
  return (
    <>
      <HeaderBreadcrumbs
        heading={vn.popupManage.list.title}
        links={[
          { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
          { name: BREADCUMBS.POPUP_MANAGE, href: PATH_DASHBOARD.popupManage.list },
          { name: vn.popupManage.list.title },
        ]}
        action={
          <Button
            variant="contained"
            startIcon={<Iconify icon={'eva:plus-fill'} />}
            to={PATH_DASHBOARD.popupManage.create}
            component={RouterLink}
          >
            {vn.popupManage.list.createButton}
          </Button>
        }
      />
    </>
  );
}
