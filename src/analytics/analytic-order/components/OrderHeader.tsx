import { Button, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import Iconify from 'src/common/components/Iconify';
import { BREADCUMBS } from 'src/common/constants/common.constants';
import vn from 'src/common/locales/vn';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import useMessage from 'src/common/hooks/useMessage';

import { useEffect } from 'react';
import { ConfirmModal } from '../../../common/components/modal/ConfirmModal';
import { closeConfirmModal, setConfirmModal } from '../../slice';
import { dispatch, useSelector } from '../../../common/redux/store';
import { useRequestExport } from '../hooks/useRequestExport';

export default function OrderHeader() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const { searchParams, confirmModal } = useSelector((state) => state.chart);
  const handleCloseDeleteModal = () => {
    dispatch(closeConfirmModal());
  };
  const { mutate, isSuccess } = useRequestExport({
    onSuccess: () => showSuccessSnackbar(t('survey.action.export.sucess')),
    onError: () => showErrorSnackbar(t('survey.action.export.fail')),
  });
  const handleRequestExport = () => {
    mutate(searchParams);
  };
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
  return (
    <>
      <HeaderBreadcrumbs
        heading={vn.chartManage.title.order}
        links={[
          { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
          { name: vn.chartManage.root, href: PATH_DASHBOARD.chartManage.root },
          { name: vn.chartManage.order },
        ]}
        action={
          <Stack direction={'row'} spacing={2}>
            <Button
              variant="contained"
              onClick={handleRequestExport}
              startIcon={<Iconify icon={'carbon:export'} />}
            >
              {t('feedbackManage.export')}
            </Button>
          </Stack>
        }
      />
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={handleCloseDeleteModal}
        onSubmit={confirmModal.callback}
        type={'warning'}
        text={confirmModal.text}
      />
    </>
  );
}
