import { Button } from '@mui/material';
import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import { BREADCUMBS } from 'src/common/constants/common.constants';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import Iconify from '../../../common/components/Iconify';
import { Link as RouterLink } from 'react-router-dom';
import en from '../../../common/locales/en';

export default function CodeHeader() {
  return (
    <>
      <HeaderBreadcrumbs
        heading={en.titleCodeRelease}
        links={[
          { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
          { name: BREADCUMBS.CODE_LIST, href: PATH_DASHBOARD.code.list },
          { name: en.list },
        ]}
        action={
          <Button
            variant="contained"
            startIcon={<Iconify icon={'eva:plus-fill'} />}
            to={PATH_DASHBOARD.code.create}
            component={RouterLink}
          >
            {en.newCode}
          </Button>
        }
      />
    </>
  );
}
