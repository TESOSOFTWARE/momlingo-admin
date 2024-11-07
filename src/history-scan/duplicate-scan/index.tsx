import { Button, Container, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import HeaderBreadcrumbs from '../../common/components/HeaderBreadcrumbs';
import Page from '../../common/components/Page';
import { BREADCUMBS } from '../../common/constants/common.constants';
import useSettings from '../../common/hooks/useSettings';
import { PATH_DASHBOARD } from '../../common/routes/paths';
import DuplicateScanDashBoard from './components/DuplicateScanDashboard';
import Iconify from '../../common/components/Iconify';
import { useDispatch, useSelector } from '../../common/redux/store';
import { useNavigate } from 'react-router-dom';
import useMessage from '../../common/hooks/useMessage';
import { ConfirmModal } from '../../common/components/modal/ConfirmModal';
import { closeConfirmModal, setConfirmModal } from '../historyScan.slice';
import { useExportDuplicateCode } from '../hooks/useExportDuplicateCode';
import { useEffect } from 'react';

export default function HistoryScanList() {
  const { themeStretch } = useSettings();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { confirmModal, searchDuplicateCode } = useSelector((state) => state.historyScan);
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const { mutate, isSuccess } = useExportDuplicateCode({
    onSuccess: () => showSuccessSnackbar(t('historyScan.export.successExport')),
    onError: () => showErrorSnackbar(t('historyScan.export.failedExport')),
  });

  const handleCloseConfirmModal = () => {
    dispatch(closeConfirmModal());
  };

  const searchParams = {
    startDate:
      searchDuplicateCode?.startDate !== null ? searchDuplicateCode.startDate : undefined,
    endDate:
      searchDuplicateCode?.endDate !== null ? searchDuplicateCode.endDate : undefined,
    searchText: searchDuplicateCode?.searchText
      ? searchDuplicateCode.searchText
      : undefined,
    phoneNumber: searchDuplicateCode?.phoneNumber
      ? searchDuplicateCode.phoneNumber
      : undefined,
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
    <Page title={t('historyScan.listDuplicate')}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading={t('historyScan.listDuplicate')}
          links={[
            { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
            {
              name: t('historyScan.listDuplicate'),
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
        <DuplicateScanDashBoard />

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
