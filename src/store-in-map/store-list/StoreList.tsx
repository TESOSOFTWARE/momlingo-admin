import { Button, Container, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import HeaderBreadcrumbs from '../../common/components/HeaderBreadcrumbs';
import Iconify from '../../common/components/Iconify';
import Page from '../../common/components/Page';
import useSettings from '../../common/hooks/useSettings';
import { PATH_DASHBOARD } from '../../common/routes/paths';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { BREADCUMBS } from '../../common/constants/common.constants';
import StoreTable from './components/StoreTable';
import { useEffect } from 'react';
import useMessage from 'src/common/hooks/useMessage';
import { dispatch, useSelector } from '../../common/redux/store';
import { closeConfirmModal, setConfirmModal } from './storeInMap.slice';
import { useExportStore } from './hooks/useExportStore';
import { ConfirmModal } from '../../common/components/modal/ConfirmModal';
import { usePresignImg } from '../../common/hooks/usePresignImg';
import { useImportStoreMap } from './hooks/useImportStoreMap';

export default function StoreList() {
  const { t } = useTranslation();
  const { themeStretch } = useSettings();
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const navigate = useNavigate();
  const { searchParams, confirmModal } = useSelector((state) => state.storeInMap);
  const handleCloseDeleteModal = () => {
    dispatch(closeConfirmModal());
  };
  const { handleUpload } = usePresignImg();

  const { mutate, isSuccess } = useExportStore(
    {
      onSuccess: () => showSuccessSnackbar(t('survey.action.export.sucess')),
      onError: () => showErrorSnackbar(t('survey.action.export.fail')),
    })

  const { mutate : requestImport,isSuccess:successRequestImport } = useImportStoreMap(
    searchParams?.searchText === null ?
    {...searchParams,searchText: undefined}: searchParams);
  const handleRequestExport = () => {
    if(searchParams?.searchText === null)  
    mutate({...searchParams,searchText: undefined})
    else mutate(searchParams)

  }
  useEffect(() => {
    if (isSuccess  || successRequestImport) {
      if(isSuccess){
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
      else{
        dispatch(
          setConfirmModal({
            isOpen: true,
            text: t('survey.action.export.redirectImportList'),
            callback: () => {
              navigate(PATH_DASHBOARD.fileManage.listFileImport)
            },
          })
        );
      }
     
    }

  }, [isSuccess ,successRequestImport])
  const handleDrop = async (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const url = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      const filex = await handleUpload(url as File);
      requestImport(filex?.id);
    }
  };
  return (
    <Page title="Danh sách cửa hàng (bản đồ)">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={t('storeInMap.list.title')}
          links={[
            { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
            { name: BREADCUMBS.STORE_IN_MAP, href: PATH_DASHBOARD.storeInMap.list },
            { name: t('storeInMap.list.title') },
          ]}
          action={
            <Stack direction={'row'} spacing={2}>
              <Button
                variant="contained"
                startIcon={<Iconify icon={'eva:plus-fill'} />}
                to={PATH_DASHBOARD.storeInMap.new}
                component={RouterLink}
              >
                {t('storeInMap.list.create')}
              </Button>
              <Button
                  variant="contained"
                  sx={{background:"#64e30f" , "&:hover":{background:"#3c7c12"}}}
                  startIcon={<Iconify icon={'mdi:file-import'} />}
                  component="label"
                >
                  {`${t('manage_store.import.title')}`}
                  <input
                    hidden
                    multiple
                    type="file"
                    onChange={handleDrop}
                    accept=".xlsx"
                  />
                </Button>
              <Button onClick={handleRequestExport}  variant="contained" sx={{background:"#2c75ed" , "&:hover":{background:"#2858a7"}}} startIcon={<Iconify icon={'carbon:export'} />}>
                {t('survey.userSurvey.export')}
              </Button>
              
            </Stack>
          }
        />
        {(isSuccess || successRequestImport) && (<ConfirmModal
          isOpen={confirmModal.isOpen}
          onClose={handleCloseDeleteModal}
          onSubmit={confirmModal.callback}
          type={'warning'}
          text={confirmModal.text}
        />)}
        <StoreTable />

      </Container>
    </Page>
  );
}
