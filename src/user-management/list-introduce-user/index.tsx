import { Container,Button } from '@mui/material';
import Page from '../../common/components/Page';
import HeaderBreadcrumbs from '../../common/components/HeaderBreadcrumbs';
import { BREADCUMBS } from '../../common/constants/common.constants';
import { PATH_DASHBOARD } from '../../common/routes/paths';
import useSettings from '../../common/hooks/useSettings';
import i18n from 'src/common/locales/i18n';
import ListIntroduceUserDashBoard from './components/ListIntroduceUserDashboard';
import { ConfirmModal } from '../../common/components/modal/ConfirmModal';
import { dispatch, useSelector } from '../../common/redux/store';
import { useTranslation } from 'react-i18next';
import { closeConfirmModal, setConfirmModal } from '../userManage.slice';
import useMessage from 'src/common/hooks/useMessage';
import { useExportIntroduced } from '../hooks/useExportIntroduced';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IListUserIntroduceParams } from '../interfaces';
import Iconify from '../../common/components/Iconify';

export default function AppIntroduceUser() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleCloseRedirectModal = () => {
    dispatch(closeConfirmModal());
  };
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const {  confirmModal,filterParamsIntroduced } = useSelector(
    (state) => state.userManage
  );
  const { themeStretch } = useSettings();
  const { mutate, isSuccess } = useExportIntroduced(
    {
      onSuccess: () => showSuccessSnackbar(t('manage_store.export.sucess')),
      onError: () => showErrorSnackbar(t('manage_store.export.false')),
    })
    useEffect(() => {
      if (isSuccess) {
      
          dispatch(
            setConfirmModal({
              isOpen: true,
              text: t('survey.action.export.redirectExportList'),
              callback: () => {
                navigate(PATH_DASHBOARD.fileManage.listFileExport)
              },
            })
          );
          }
  
  
    }, [isSuccess])
  const handleRequestExport = () => {
    
    mutate(filterParamsIntroduced)

  }
  return (
    <Page title={i18n.t('introduceUser.title')}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading={i18n.t('introduceUser.list')}
          links={[
            {
              name: `${i18n.t('introduceUser.title')}`,
              href: '',
            },
            {
              name: `${i18n.t('introduceUser.list')}`,
              href: '',
            },
          ]}
          action={
              <Button sx={{ background: "#64e30f", "&:hover": { background: "#3c7c12" } }} onClick={handleRequestExport} variant="contained" startIcon={<Iconify icon={'carbon:export'} />}>
                {t('survey.userSurvey.export')}
              </Button>            
          }
        />
       <ConfirmModal
            isOpen={confirmModal.isOpen}
            onClose={handleCloseRedirectModal}
            onSubmit={confirmModal.callback}
            type={'warning'}
            text={confirmModal.text}
          />
        <ListIntroduceUserDashBoard />
      </Container>
    </Page>
  );
}
