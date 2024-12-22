// Home user list
import { Button, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import useMessage from 'src/common/hooks/useMessage';
import i18n from 'src/common/locales/i18n';
import HeaderBreadcrumbs from '../../common/components/HeaderBreadcrumbs';
import Iconify from '../../common/components/Iconify';
import Page from '../../common/components/Page';
import useSettings from '../../common/hooks/useSettings';
import useTable from '../../common/hooks/useTable';
import { dispatch } from '../../common/redux/store';
import { useRequestExportListUser } from '../hooks/useRequestExportListUser';
import { IListUserParams } from '../interfaces';
import { searchFormSelector, setIsOpenModalRequestExport } from '../userManage.slice';
import ListUserDashBoard from './components/ListUserDashboard';
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
          // action={
          //   <Button
          //     variant="contained"
          //     startIcon={<Iconify icon={'eva:plus-fill'} />}
          //     onClick={handleRequestExport}
          //   >
          //     {`${i18n.t('export')}`}
          //   </Button>
          // }
        />
        <ListUserDashBoard />
        {/* <ConfirmModalExport /> */}
      </Container>
    </Page>
  );
}
