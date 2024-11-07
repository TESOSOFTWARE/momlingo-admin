import {
  Box,
  Button,
  Container,
  FormControlLabel,
  Paper,
  Stack,
  Switch,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import Page from 'src/common/components/Page';
import { TableHeadCustom, TableNoData } from 'src/common/components/table';
import { BREADCUMBS } from 'src/common/constants/common.constants';
import useSettings from 'src/common/hooks/useSettings';
import useTable from 'src/common/hooks/useTable';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import Iconify from '../../common/components/Iconify';
import { dispatch, useSelector } from '../../common/redux/store';
import { dataListStore, HEAD_LABELS } from '../constant';
import { DeleteStoreModal } from './components/DeleteStoreModal';
import { ListStoreTableRow } from './components/ListStoreTableRow';
import { ListStoreTableToolbar } from './components/ListStoreTableToolbar';
import { IParamsFilter } from '../interfaces';
import { useGetListStore } from '../hooks/useGetListStore';
import TableSkeleton from './components/TableSkeleton';
import { useCallback, useEffect } from 'react';
import { usePresignImg } from '../../common/hooks/usePresignImg';
import { useImportExternalReferrer } from '../hooks/useImportExternalReferrer';
import LoadingTableSkeleton from '../../common/components/LoadingTableSkeleton';
import lodash from 'lodash';
import useMessage from 'src/common/hooks/useMessage';
import { useExportExternal } from '../hooks/useExportExternal';
import { closeConfirmModal, setConfirmModal } from '../manageStore.slice';
import { ConfirmModal } from '../../common/components/modal/ConfirmModal';

export const ListStoreContainer = () => {
  const { t } = useTranslation();
  const { themeStretch } = useSettings();
  const navigate = useNavigate();
  const { handleUpload } = usePresignImg();

  const { confirmDeleteModalStatus, filterListParams, confirmModal } = useSelector(
    (state) => state.manageStore
  );
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const handleCloseRedirectModal = () => {
    dispatch(closeConfirmModal());
  };
  const {
    dense,
    page,
    rowsPerPage,
    setPage,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const searchParams: IParamsFilter = {
    page: page + 1,
    limit: rowsPerPage,
    from: filterListParams?.from || '',
    to: filterListParams?.to || '',
    name: filterListParams?.name || '',
    phoneNumber: encodeURIComponent(filterListParams?.phoneNumber || ''),
  };
  const { data, isLoading, isError } = useGetListStore(searchParams);
  const { mutate: requestImport, isSuccess: successRequestImport } =
    useImportExternalReferrer({
      page: page + 1,
      limit: rowsPerPage,
    });
  const { mutate, isSuccess } = useExportExternal({
    onSuccess: () => showSuccessSnackbar(t('manage_store.export.sucess')),
    onError: () => showErrorSnackbar(t('manage_store.export.false')),
  });

  const handleRequestExport = () => {
    Object.keys(searchParams)?.forEach((item) => {
      if (searchParams[item as keyof IParamsFilter] === '') {
        delete searchParams[item as keyof IParamsFilter];
      }
    });
    mutate(searchParams);
  };
  const dataListExternalReffer = data?.items || [];
  useEffect(() => {
    if (isSuccess || successRequestImport) {
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
      } else {
        dispatch(
          setConfirmModal({
            isOpen: true,
            text: t('survey.action.export.redirectImportList'),
            callback: () => {
              navigate(PATH_DASHBOARD.fileManage.listFileImport);
            },
          })
        );
      }
    }
  }, [isSuccess, successRequestImport]);
  const totalItems = data?.meta?.totalItems || 0;

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
    <>
      <Page title={t('manage_store.listStore')}>
        <Container maxWidth={themeStretch ? 'sm' : 'xl'}>
          <HeaderBreadcrumbs
            heading={t('manage_store.listStore')}
            links={[
              { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
              { name: t('manage_store.listStore') },
            ]}
            action={
              <Stack direction="row" spacing={3}>
                <Button
                  variant="contained"
                  color="secondary"
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

                <Button
                  sx={{ background: '#64e30f', '&:hover': { background: '#3c7c12' } }}
                  onClick={handleRequestExport}
                  variant="contained"
                  startIcon={<Iconify icon={'carbon:export'} />}
                >
                  {t('survey.userSurvey.export')}
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Iconify icon={'eva:plus-fill'} />}
                  to={PATH_DASHBOARD.manageStore.create}
                  component={RouterLink}
                >
                  {`${t('manage_store.createStore')}`}
                </Button>
              </Stack>
            }
          />
          {(isSuccess || successRequestImport) && (
            <ConfirmModal
              isOpen={confirmModal.isOpen}
              onClose={handleCloseRedirectModal}
              onSubmit={confirmModal.callback}
              type={'warning'}
              text={confirmModal.text}
            />
          )}
          <Paper elevation={3}>
            <ListStoreTableToolbar onSetPage={setPage} />
            <TableContainer>
              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  headLabel={HEAD_LABELS}
                  rowCount={dataListExternalReffer.length}
                />
                <TableBody>
                  {dataListExternalReffer.map((item, index) => (
                    <ListStoreTableRow data={item} key={index} />
                  ))}
                  {isLoading && (
                    <LoadingTableSkeleton
                      row={rowsPerPage}
                      column={HEAD_LABELS?.length}
                    />
                  )}

                  <TableNoData
                    isNotFound={!isLoading && !dataListExternalReffer.length}
                  />
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ position: 'relative' }}>
              <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                count={lodash.isEmpty(totalItems) ? (totalItems as number) : 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={onChangePage}
                onRowsPerPageChange={onChangeRowsPerPage}
              />
              <FormControlLabel
                control={<Switch checked={dense} onChange={onChangeDense} />}
                label="Dense"
                sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
              />
            </Box>
          </Paper>
        </Container>

        {confirmDeleteModalStatus && <DeleteStoreModal />}
      </Page>
    </>
  );
};
