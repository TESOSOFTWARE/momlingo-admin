import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import Iconify from 'src/common/components/Iconify';
import { BREADCUMBS } from 'src/common/constants/common.constants';
import vn from 'src/common/locales/vn';
import { PATH_DASHBOARD } from 'src/common/routes/paths';

export default function NotificationListHeader() {
  const { t } = useTranslation();
  return (
    <>
      <HeaderBreadcrumbs
        heading={t('notificationManage.list.title')}
        links={[
          {
            name: t('notificationManage.root'),
            href: PATH_DASHBOARD.notificationManage.list,
          },
          { name: t('notificationManage.list.title') },
        ]}
        action={
          <Button
            variant="contained"
            startIcon={<Iconify icon={'eva:plus-fill'} />}
            to={PATH_DASHBOARD.notificationManage.create}
            component={RouterLink}
          >
            {vn.notificationManage.list.createButton}
          </Button>
        }
      />
    </>
  );
}
