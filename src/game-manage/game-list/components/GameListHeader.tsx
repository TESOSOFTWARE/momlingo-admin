import { Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import Iconify from 'src/common/components/Iconify';
import { BREADCUMBS } from 'src/common/constants/common.constants';
import vn from 'src/common/locales/vn';
import { PATH_DASHBOARD } from 'src/common/routes/paths';

export default function GameListHeader() {
  return (
    <>
      <HeaderBreadcrumbs
        heading={vn.gameManage.list.title}
        links={[
          { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
          { name: BREADCUMBS.GAME_MANAGE, href: PATH_DASHBOARD.gameManage.list },
          { name: vn.gameManage.list.title },
        ]}
        action={
          <Button
            variant="contained"
            startIcon={<Iconify icon={'eva:plus-fill'} />}
            to={PATH_DASHBOARD.gameManage.create}
            component={RouterLink}
          >
            {vn.gameManage.list.createButton}
          </Button>
        }
      />
    </>
  );
}
