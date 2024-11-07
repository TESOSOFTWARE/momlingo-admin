import { Button, Container, Stack } from '@mui/material';
import useSettings from '../common/hooks/useSettings';
import Page from '../common/components/Page';
import HeaderBreadcrumbs from '../common/components/HeaderBreadcrumbs';
import { useTranslation } from 'react-i18next';
import HistoryScanDashBoard from './components/HistoryScanDashboard';
import { BREADCUMBS } from '../common/constants/common.constants';
import { PATH_DASHBOARD } from '../common/routes/paths';
import Iconify from '../common/components/Iconify';
import { useExportListHistoryScan } from './hooks/useExportListHistoryScan';
import useMessage from '../common/hooks/useMessage';
import { useEffect } from 'react';
import { ConfirmModal } from '../common/components/modal/ConfirmModal';
import { useDispatch, useSelector } from '../common/redux/store';
import { closeConfirmModal, setConfirmModal } from './historyScan.slice';
import { useNavigate } from 'react-router-dom';
import { IListHistoryScanParams } from './interfaces';

export default function HistoryScanList() {
  const { themeStretch } = useSettings();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { confirmModal, searchForm } = useSelector((state) => state.historyScan);
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const { mutate, isSuccess } = useExportListHistoryScan({
    onSuccess: () => showSuccessSnackbar(t('historyScan.export.successExport')),
    onError: () => showErrorSnackbar(t('historyScan.export.failedExport')),
  });

  const handleCloseConfirmModal = () => {
    dispatch(closeConfirmModal());
  };

  const searchParams: IListHistoryScanParams = {
    startDate: searchForm?.startDate !== null ? searchForm.startDate : undefined,
    endDate: searchForm?.endDate !== null ? searchForm.endDate : undefined,
    productGroup: searchForm?.productGroup ? searchForm.productGroup : undefined,
    status: searchForm?.status ? searchForm.status : undefined,
    code: searchForm?.code ? searchForm.code : undefined,
  };

  const handleRequestExport = () => {
    mutate(searchParams);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        setConfirmModal({
          isOpen: true,
          text: t('historyScan.export.titleConfirmExport'),
          callback: () => {
            navigate(PATH_DASHBOARD.fileManage.listFileExport);
          },
        })
      );
    }
  }, [isSuccess]);

  return (
    <Page title={t('historyScan.title')}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading={t('historyScan.title')}
          links={[
            { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
            {
              name: t('historyScan.title'),
              href: '',
            },
          ]}
          action={
            <Stack direction={'row'} spacing={2}>
              <Button
                onClick={handleRequestExport}
                variant="contained"
                startIcon={<Iconify icon={'carbon:export'} />}
              >
                {t('historyScan.export.title')}
              </Button>
            </Stack>
          }
        />
        <HistoryScanDashBoard />
        <ConfirmModal
          isOpen={confirmModal.isOpen}
          onClose={handleCloseConfirmModal}
          onSubmit={confirmModal.callback}
          type={'warning'}
          text={confirmModal.text}
        />
      </Container>
    </Page>
  );
}
