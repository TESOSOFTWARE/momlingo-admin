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
  Container,
} from '@mui/material';
import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import Iconify from 'src/common/components/Iconify';
import { BREADCUMBS } from 'src/common/constants/common.constants';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ConfirmModal } from '../../common/components/modal/ConfirmModal';
import useTable from '../../common/hooks/useTable';
import { useDispatch, useSelector } from '../../common/redux/store';
import useMessage from '../../common/hooks/useMessage';
import useDebounce from 'src/common/hooks/useDebounce';
import SurveyTableSkeleton from './components/SurveyTableSkeleton';
import useDeepEffect from '../../common/hooks/useDeepEffect';
import { useDeleteSurveyById } from './hooks/useDeleteSurveyById';
import { ISurveySearchParam, Survey } from '../common/survey.interface';
import {
  setConfirmModal,
  closeConfirmModal,
  setSearchText,
  setSearchType,
} from '../common/survey.slice';
import { useGetListSurveys } from './hooks/useGetListSurveys';
import { useSelectMultiple } from '../../common/hooks/useSelectMultiple';
import SurveyListToolbar from './components/SurveysListToolbar';
import Scrollbar from '../../common/components/Scrollbar';
import {
  TableHeadCustom,
  TableNoData,
  TableSelectedActions,
} from '../../common/components/table';
import { SURVEY_TABLE_HEAD } from '../common/survey.constant';
import SurveyTableRow from './components/SurveysListTableRow';
import Page from '../../common/components/Page';
import useSettings from '../../common/hooks/useSettings';
export default function ListSurveys() {
  const { themeStretch } = useSettings();
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
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const { useDeepCompareEffect } = useDeepEffect();
  const { searchText, searchType, confirmModal } = useSelector((state) => state.survey);

  const searchParams: ISurveySearchParam = {
    page: page + 1,
    limit: rowsPerPage,
  };
  const handleFilterName = (filterName: string) => {
    dispatch(setSearchText(filterName));
    setPage(0);
  };

  const handleFilterType = (filterType: string) => {
    dispatch(setSearchType(filterType));
    setPage(0);
  };

  const handleViewUsers = (id: number) => {
    navigate(PATH_DASHBOARD.survey.view_user(id));
  };
  const { mutate: deleteSurveyById } = useDeleteSurveyById({
    page: page + 1,
    limit: rowsPerPage,
  });
  const handleCloseDeleteModal = () => {
    dispatch(closeConfirmModal());
  };

  const handleDeleteSingle = (survey: Survey) => {
    dispatch(
      setConfirmModal({
        isOpen: true,
        text: t('survey.action.delete.root'),
        callback: () => {
          setSelectedIds(selectedIds.filter((index) => index !== survey.id));
          deleteSurveyById(survey.id);
        },
      })
    );
  };
  const debouncedSearchText = useDebounce<string>(searchText, 500);
  const debouncedSearchType = useDebounce<string>(searchType, 500);

  if (debouncedSearchText.length > 2) searchParams.searchText = debouncedSearchText;
  if (debouncedSearchType) searchParams.searchType = debouncedSearchType;
  const { data, isLoading } = useGetListSurveys({
    ...searchParams,
  });
  const dataListSurveys = data?.items || [];
  const {
    isCheckedAll,
    reset: resetSelect,
    selectedIds,
    setSelectedIds,
    handleSelectItem,
    handleCheckAll,
  } = useSelectMultiple(
    dataListSurveys.map((item) => item.id),
    page + 1
  );

  const handleEditRow = (id: number) => {
    navigate(PATH_DASHBOARD.survey.edit(id));
  };
  const handleDeleteMulti = (ids: number[]) => {
    ids.map((id) => {
      deleteSurveyById(id);
    });
    resetSelect();
  };
  const { totalItems } = data?.meta || {
    totalItems: 0,
  };
  const isNotFound = !isLoading && !dataListSurveys.length;
  return (
    <>
      <Page title={t('survey.list')}>
        <Container maxWidth={themeStretch ? 'sm' : 'xl'}>
          <HeaderBreadcrumbs
            heading={t('survey.root')}
            links={[
              { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
              { name: BREADCUMBS.SURVEY_MANAGE, href: PATH_DASHBOARD.survey.list },
              { name: t('survey.list') },
            ]}
            action={
              <Button
                variant="contained"
                startIcon={<Iconify icon={'eva:plus-fill'} />}
                to={PATH_DASHBOARD.survey.create}
                component={RouterLink}
              >
                {t('survey.create.title')}
              </Button>
            }
          />
          <Card sx={{ padding: 3 }}>
            <ConfirmModal
              isOpen={confirmModal.isOpen}
              onClose={handleCloseDeleteModal}
              onSubmit={confirmModal.callback}
              type={'delete'}
              text={confirmModal.text}
            />
            <Scrollbar>
              <TableContainer sx={{ position: 'relative' }}>
                {!!selectedIds.length && (
                  <TableSelectedActions
                    dense={dense}
                    isSelectAll={isCheckedAll}
                    numSelected={selectedIds.length}
                    rowCount={dataListSurveys.length}
                    onSelectAllRows={handleCheckAll}
                    actions={
                      <Tooltip title="Delete">
                        <IconButton
                          color="primary"
                          onClick={() => {
                            handleDeleteMulti(selectedIds);
                          }}
                        >
                          <Iconify icon={'eva:trash-2-outline'} />
                        </IconButton>
                      </Tooltip>
                    }
                  />
                )}

                <Table size={dense ? 'small' : 'medium'}>
                  <TableHeadCustom
                    isSelectAll={isCheckedAll}
                    headLabel={SURVEY_TABLE_HEAD}
                    rowCount={dataListSurveys.length}
                    numSelected={selectedIds.length}
                    onSort={onSort}
                    onSelectAllRows={handleCheckAll}
                  />

                  <TableBody>
                    {dataListSurveys.map((row: Survey) => (
                      <SurveyTableRow
                        key={row.id}
                        row={row}
                        selected={selectedIds.includes(row.id)}
                        onSelectRow={(e) => {
                          handleSelectItem(row.id, e);
                        }}
                        onDeleteRow={() => handleDeleteSingle(row)}
                        onEditRow={() => {
                          handleEditRow(row.id);
                        }}
                        onViewUsers={() => {
                          handleViewUsers(row.id);
                        }}
                      />
                    ))}
                    <SurveyTableSkeleton isLoading={isLoading} row={rowsPerPage} />
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
        </Container>
      </Page>
    </>
  );
}
