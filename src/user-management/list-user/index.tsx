import { Container, Button } from '@mui/material';
import Page from '../../common/components/Page';
import HeaderBreadcrumbs from '../../common/components/HeaderBreadcrumbs';
import { BREADCUMBS } from '../../common/constants/common.constants';
import { PATH_DASHBOARD } from '../../common/routes/paths';
import useSettings from '../../common/hooks/useSettings';
import i18n from 'src/common/locales/i18n';
import ListUserDashBoard from './components/ListUserDashboard';
import Iconify from '../../common/components/Iconify';
import useMessage from 'src/common/hooks/useMessage';
import { useRequestExportListUser } from '../hooks/useRequestExportListUser';
import { useTranslation } from 'react-i18next';
import { IListUserParams } from '../interfaces';
import { useSelector } from 'react-redux';
import {
  isOpenModalRequestExportSelector,
  searchFormSelector,
  setIsOpenModalRequestExport,
} from '../userManage.slice';
import useTable from '../../common/hooks/useTable';
import { dispatch } from '../../common/redux/store';
import { ConfirmBlockModal } from './components/modal/ModalConfirmBlock';
import ConfirmModalExport from './components/modal/ConfirmModalExport';

export default function UserManagement() {
  const { themeStretch } = useSettings();
  const { t } = useTranslation();
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const searchData = useSelector(searchFormSelector);
  const { page, rowsPerPage } = useTable();

  const { mutate } = useRequestExportListUser({
    onSuccess: () => {
      showSuccessSnackbar(t('userManage.export.successExport'));
      dispatch(setIsOpenModalRequestExport(true));
    },
    onError: () => showErrorSnackbar(t('userManage.export.failedExport')),
  });

  const searchParams: IListUserParams = {
    page: page + 1,
    limit: rowsPerPage,
    name: searchData.name === '' ? undefined : searchData.name,
    tierCode: searchData.tierCode === '' ? undefined : searchData.tierCode,
    email: searchData.email === '' ? undefined : searchData.email,
    phoneNumber: searchData.phoneNumber === '' ? undefined : searchData.phoneNumber,
    accountStatus: searchData.accountStatus === '' ? undefined : searchData.accountStatus,
  };

  const handleRequestExport = () => {
    mutate(searchParams);
  };
  return (
    <Page title={i18n.t('userManage.title')}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading={i18n.t('userManage.list')}
          links={[
            {
              name: `${i18n.t('userManage.title')}`,
              href: '',
            },
            {
              name: `${i18n.t('userManage.list')}`,
              href: '',
            },
          ]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon={'eva:plus-fill'} />}
              onClick={handleRequestExport}
            >
              {`${i18n.t('export')}`}
            </Button>
          }
        />
        <ListUserDashBoard />
        <ConfirmModalExport />
      </Container>
    </Page>
  );
}
