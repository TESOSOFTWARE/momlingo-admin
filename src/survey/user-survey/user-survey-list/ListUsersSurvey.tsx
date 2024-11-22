import {
  Button,
  Card,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableContainer,
  Tooltip,
  Box,
  TablePagination,
  FormControlLabel,
  Switch,
  Stack,
} from '@mui/material';
import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import { BREADCUMBS } from 'src/common/constants/common.constants';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useTable from 'src/common/hooks/useTable';
import { useGetListUsersSurvey } from './hooks/useGetListUserSurvey';
import Scrollbar from 'src/common/components/Scrollbar';
import {
  TableHeadCustom,
  TableNoData,
  TableSelectedActions,
} from 'src/common/components/table';
import { USER_SURVEY_TABLE_HEAD } from '../common/constant';
import UserSurveyTableRow from './components/UserSurveyTableRow';
import {
  IParamsUserSurvey,
  IUserSurvey,
  IUserSurveyTableProps,
} from '../common/interface';
import { useSelectMultiple } from '../../../common/hooks/useSelectMultiple';
import UserSurveySkeleton from './components/UserSuverySkeleton';
import LoadingTableSkeleton from '../../../common/components/LoadingTableSkeleton';
import Iconify from '../../../common/components/Iconify';
import { useRequestExport } from './hooks/useRequestExport';
import useMessage from 'src/common/hooks/useMessage';
import { dispatch, useSelector } from '../../../common/redux/store';
import { closeConfirmModal, setConfirmModal } from '../../common/survey.slice';
import { ConfirmModal } from '../../../common/components/modal/ConfirmModal';
import { useEffect } from 'react';

export default function ListUsersSurvey() {
  const navigate = useNavigate();
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    setSelected,

    selected: selectedRows,
    onSelectRow,
    onSelectAllRows,
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();
  const { confirmModal } = useSelector((state) => state.survey);

  const { t } = useTranslation();
  const { id } = useParams();
  const searchParams: IParamsUserSurvey = {
    page: page + 1,
    limit: rowsPerPage,
    surveyId: parseInt(id as string),
  };
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const handleCloseDeleteModal = () => {
    dispatch(closeConfirmModal());
  };
  const { data, isLoading } = useGetListUsersSurvey(searchParams, parseInt(id as string));
  const { mutate, isSuccess } = useRequestExport({
    onSuccess: () => showSuccessSnackbar(t('survey.action.export.sucess')),
    onError: () => showErrorSnackbar(t('survey.action.export.fail')),
  });
  const dataList: IUserSurvey[] = data?.items || [];
  const {
    isCheckedAll,
    reset: resetSelect,
    selectedIds,
    setSelectedIds,
    handleSelectItem,
    handleCheckAll,
  } = useSelectMultiple(
    dataList.map((item) => item?.user?.id),
    page + 1
  );
  const { totalItems } = data?.meta || {
    totalItems: 0,
  };
  const isNotFound = !isLoading && !dataList.length;
  const handleRequestExport = () => {
    mutate(parseInt(id as string));
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
        heading={t('survey.root')}
        links={[
          { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
          { name: BREADCUMBS.SURVEY_MANAGE, href: PATH_DASHBOARD.survey.list },
          { name: t('survey.list'), href: PATH_DASHBOARD.survey.list },
          { name: t('survey.userSurvey.list') },
        ]}
        action={
          <Stack direction={'row'} spacing={2}>
            <Button
              onClick={handleRequestExport}
              variant="contained"
              startIcon={<Iconify icon={'carbon:export'} />}
            >
              {t('survey.userSurvey.export')}
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
      <Card sx={{ padding: 3 }}>
        <Scrollbar>
          <TableContainer sx={{ position: 'relative' }}>
            {!!selectedIds?.length && (
              <TableSelectedActions
                dense={dense}
                isSelectAll={isCheckedAll}
                numSelected={selectedIds?.length}
                rowCount={dataList?.length}
                onSelectAllRows={handleCheckAll}
              />
            )}

            <Table size={dense ? 'small' : 'medium'}>
              <TableHeadCustom
                isSelectAll={isCheckedAll}
                headLabel={USER_SURVEY_TABLE_HEAD}
                rowCount={dataList?.length}
                numSelected={selectedIds?.length}
                onSort={onSort}
                onSelectAllRows={handleCheckAll}
              />

              <TableBody>
                {dataList?.map((row: IUserSurvey) => (
                  <UserSurveyTableRow
                    key={row?.user?.id}
                    row={row}
                    selected={selectedIds.includes(row?.user?.id)}
                    onSelectRow={(e) => {
                      handleSelectItem(row?.user?.id, e);
                    }}
                    onViewDetailRow={() => {
                      navigate(
                        PATH_DASHBOARD.survey.view_user_detail(
                          parseInt(id as string),
                          row?.user?.id
                        )
                      );
                    }}
                  />
                ))}
                {isLoading && (
                  <LoadingTableSkeleton
                    row={rowsPerPage}
                    column={USER_SURVEY_TABLE_HEAD.length}
                  />
                )}
                <TableNoData isNotFound={isNotFound} />
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Box sx={{ position: 'relative' }}>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={totalItems}
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
      </Card>
    </>
  );
}
