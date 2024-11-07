import { Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import Iconify from 'src/common/components/Iconify';
import { BREADCUMBS } from 'src/common/constants/common.constants';
import vn from 'src/common/locales/vn';
import { PATH_DASHBOARD } from 'src/common/routes/paths';

export default function TierRankListHeader() {
  return (
    <>
      <HeaderBreadcrumbs
        heading={vn.tierRankManage.list.title}
        links={[
          { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
          { name: BREADCUMBS.TIER_RANK_MANAGE, href: PATH_DASHBOARD.tierRankManage.list },
          { name: vn.tierRankManage.list.title },
        ]}
      
      />
    </>
  );
}
