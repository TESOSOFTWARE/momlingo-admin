import { Button, Typography, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import Iconify from 'src/common/components/Iconify';
import { BREADCUMBS } from 'src/common/constants/common.constants';
import vn from 'src/common/locales/vn';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { dispatch } from '../../../common/redux/store';
import { setIsOpenEditSpoonCode } from '../../requestManage.slice';
import { useGetLimitSpoonCode } from '../hooks/useGetLimitSpoonCode';
import LimitSpoonCode from './LimitSpoonCode';
import Can from '../../../common/lib/Can';
import { useTranslation } from 'react-i18next';
import { Action, Resource } from '../../../common/constants/common.interfaces';

export default function RequestListHeader() {
  const { data } = useGetLimitSpoonCode();
  const dataLimit = data || [];

  const { t } = useTranslation();
  return (
    <>
      <LimitSpoonCode />
      <HeaderBreadcrumbs
        heading={t('requestManagement.list')}
        links={[
          { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
          { name: BREADCUMBS.REQUEST, href: PATH_DASHBOARD.requestManage.list },
          { name: `${t('requestManagement.list')}` },
        ]}
        action={
          <Can do={Action.CREATE} on={Resource.FILE_REQUEST}>
            <Stack direction={'row'} spacing={3}>
              <Button
                variant="contained"
                startIcon={<Iconify icon={'eva:plus-fill'} />}
                to={PATH_DASHBOARD.requestManage.createSpoon}
                component={RouterLink}
              >
                {`${t('requestManagement.createSpoon')}`}
              </Button>
              <Button
                variant="contained"
                startIcon={<Iconify icon={'eva:plus-fill'} />}
                to={PATH_DASHBOARD.requestManage.createSBPS}
                component={RouterLink}
              >
                {`${t('requestManagement.createSBPS')}`}
              </Button>
            </Stack>
          </Can>
        }
      />
      <Can do={Action.CREATE} on={Resource.FILE_REQUEST}>
        <Stack direction="row" justifyContent="end">
          <Typography variant="h5" lineHeight={2.5}>
            Giới hạn mã theo tháng : {dataLimit[0]?.value}
          </Typography>
          <Button
            sx={{ '&:hover': { background: 'transparent' } }}
            onClick={() => dispatch(setIsOpenEditSpoonCode(true))}
          >
            Sửa{' '}
          </Button>
        </Stack>
      </Can>
    </>
  );
}
