import { Button, Stack, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import HeaderBreadcrumbs from '../../common/components/HeaderBreadcrumbs';
import Page from '../../common/components/Page';
import { BREADCUMBS } from '../../common/constants/common.constants';
import useSettings from '../../common/hooks/useSettings';
import { PATH_DASHBOARD } from '../../common/routes/paths';
import { EditStoreForm } from '../edit-store/components/EditStoreForm';
import { ReferralHistoryTable } from './components/ReferralHistoryTable';
import { useDispatch, useSelector } from '../../common/redux/store';
import { closeConfirmModal, setConfirmModal, setModeAction } from '../manageStore.slice';
import { useEffect } from 'react';
import Iconify from '../../common/components/Iconify';
import { replacePathParams } from '../../common/utils/replaceParams';
import { useExportDetailExternal } from '../hooks/useExportDetailExternal';
import useShowSnackbar from '../../common/hooks/useMessage';
import { ConfirmModal } from '../../common/components/modal/ConfirmModal';

export const DetailStoreContainer = () => {
  const { t } = useTranslation();
  const { themeStretch } = useSettings();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { id } = useParams();
  const { showSuccessSnackbar, showErrorSnackbar } = useShowSnackbar();
  const { confirmModal } = useSelector((state) => state.manageStore);
  const { mutate, isSuccess } = useExportDetailExternal({
    onSuccess: () => {
      showSuccessSnackbar(t('manage_store.export.sucess'));
    },
    onError: () => showErrorSnackbar(t('manage_store.export.false')),
  });

  useEffect(() => {
    dispatch(setModeAction('detail'));
  }, []);

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        setConfirmModal({
          isOpen: true,
          text: t('survey.action.export.redirectExportList'),
          callback: () => {
            navigate(PATH_DASHBOARD.fileManage.listFileExport);
          },
        })
      );
    }
  }, [isSuccess]);
  const handleExport = () => {
    mutate(parseInt(id as string));
  };

  return (
    <>
      <Page title={t('manage_store.detailStore')}>
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
            heading={t('manage_store.detailStore')}
            links={[
              { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
              {
                name: BREADCUMBS.MANAGE_STORE_LIST,
                href: PATH_DASHBOARD.manageStore.list,
              },
              { name: t('manage_store.detailStore') },
            ]}
            action={
              <Stack direction="row" justifyContent={'flex-end'} spacing={2}>
                <Button
                  variant="contained"
                  // color="inherit"
                  sx={{ background: '#64e30f', '&:hover': { background: '#3c7c12' } }}
                  startIcon={<Iconify icon={'carbon:export'} />}
                  onClick={() => handleExport()}
                >
                  {t('survey.userSurvey.export')}
                </Button>
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={() => navigate(PATH_DASHBOARD.manageStore.list)}
                  startIcon={<Iconify icon={'ic:baseline-keyboard-arrow-left'} />}
                >
                  {t('userManage.goBack')}
                </Button>
                <Button
                  variant="contained"
                  onClick={() =>
                    navigate(
                      replacePathParams(PATH_DASHBOARD.manageStore.edit, {
                        id: parseInt(id as string),
                      })
                    )
                  }
                >
                  {t('edit')}
                </Button>
              </Stack>
            }
          />

          <EditStoreForm />

          <ReferralHistoryTable />
        </Container>
        {isSuccess && (
          <ConfirmModal
            isOpen={confirmModal.isOpen}
            onClose={() => dispatch(closeConfirmModal())}
            onSubmit={confirmModal.callback}
            type={'warning'}
            text={confirmModal.text}
          />
        )}
      </Page>
    </>
  );
};
