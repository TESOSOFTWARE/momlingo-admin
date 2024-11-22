import {
  Box,
  Card,
  Container,
  Divider,
  FormControlLabel,
  Switch,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Tooltip,
  IconButton,
  Button,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import Page from 'src/common/components/Page';
import Scrollbar from 'src/common/components/Scrollbar';
import {
  TableHeadCustom,
  TableNoData,
  TableSelectedActions,
} from 'src/common/components/table';
import { BREADCUMBS } from 'src/common/constants/common.constants';
import { useSelectMultiple } from 'src/common/hooks/useSelectMultiple';
import useSettings from 'src/common/hooks/useSettings';
import useTable from 'src/common/hooks/useTable';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import Iconify from '../../common/components/Iconify';
import { ConfirmModal } from '../../common/components/modal/ConfirmModal';
import TableSkeleton from '../../common/components/table/TableSkeletion';
import { useDispatch, useSelector } from '../../common/redux/store';
import {
  isOpenModalDeleteSelector,
  searchTextSelector,
  selectedRowsSelector,
  setIsOpenModalDelete,
  setSelectedRows,
} from '../common/slice';
import { SearchForm } from './components/SearchForm';
import { TableRow } from './components/TableRow';
import { HEAD_LABELS } from '../common/constant';
import { useNavigate } from 'react-router-dom';
import { replacePathParams } from '../../common/utils/replaceParams';
import { useGetListEvent } from '../hooks/useGetListEvent';
import { useDeleteEvent } from '../hooks/useDeleteEvent';
import useShowSnackbar from '../../common/hooks/useMessage';

export default function EventList() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
    setPage,
  } = useTable();

  const searchText = useSelector(searchTextSelector);
  const isOpenModal = useSelector(isOpenModalDeleteSelector);

  const { data, isLoading } = useGetListEvent({
    searchText: searchText === '' ? undefined : searchText,
    page: page + 1,
    limit: rowsPerPage,
  });
  const listEvent = data?.items || [];
  const totalItems = data?.meta?.totalItems || 0;

  const {
    isCheckedAll,
    reset: resetSelect,
    selectedIds,
    handleSelectItem,
    handleCheckAll,
    setSelectedIds,
  } = useSelectMultiple(
    listEvent?.map((item) => item.id),
    page + 1
  );

  const { showSuccessSnackbar, showErrorSnackbar } = useShowSnackbar();

  const { mutate } = useDeleteEvent({
    onSuccess: () => {
      showSuccessSnackbar('Xóa thành công !');
      navigate(PATH_DASHBOARD.event.list);
    },
    onError: () => {
      showErrorSnackbar('Xóa thất bại !');
    },
  });

  const pickedRows = useSelector(selectedRowsSelector);
  const handleCloseModal = () => {
    dispatch(setIsOpenModalDelete(false));
  };

  const handleDeleteMultiple = (selectedIds: number[]) => {
    dispatch(setIsOpenModalDelete(true));
    dispatch(setSelectedRows(selectedIds));
  };

  const onDeleteRow = () => {
    mutate({
      ids: pickedRows,
    });
    resetSelect();
  };

  return (
    <Page title={t('navTitle.event.root')}>
      <Container maxWidth={'xl'}>
        <HeaderBreadcrumbs
          heading={t('event.listEvent')}
          links={[
            { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
            { name: t('event.title') },
          ]}
          action={
            <>
              <Button
                variant="contained"
                onClick={() => navigate(PATH_DASHBOARD.event.create)}
                startIcon={<Iconify icon={'eva:plus-fill'} />}
              >
                {t('event.create')}
              </Button>
            </>
          }
        />

        <Card sx={{ padding: 1, borderRadius: '8px', boxShadow: 10 }}>
          <SearchForm setPage={setPage} />

          <Scrollbar>
            <ConfirmModal
              isOpen={isOpenModal}
              onClose={handleCloseModal}
              onSubmit={onDeleteRow}
              text={'Bạn có chắc muốn xóa'}
              type="delete"
            />

            <TableContainer sx={{ position: 'relative' }}>
              {!!selectedIds.length && (
                <TableSelectedActions
                  dense={dense}
                  isSelectAll={isCheckedAll}
                  numSelected={selectedIds.length}
                  rowCount={listEvent.length}
                  onSelectAllRows={handleCheckAll}
                  actions={
                    <Tooltip title={t('common.tooltip.delete.title')}>
                      <IconButton
                        color="primary"
                        onClick={() => handleDeleteMultiple(selectedIds)}
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
                  headLabel={HEAD_LABELS}
                  rowCount={0}
                  numSelected={selectedIds.length}
                  onSort={onSort}
                  onSelectAllRows={handleCheckAll}
                />

                <TableBody>
                  {listEvent?.map((item) => (
                    <TableRow
                      key={item.id}
                      row={item}
                      selected={selectedIds.includes(item.id)}
                      onSelectRow={(checked) => handleSelectItem(item.id, checked)}
                      onDeleteRow={() => handleDeleteMultiple([item.id])}
                      onEditRow={() => {
                        navigate(
                          replacePathParams(PATH_DASHBOARD.event.edit, { key: item?.id })
                        );
                      }}
                    />
                  ))}

                  {isLoading &&
                    Array.from(Array(rowsPerPage).keys()).map((index) => {
                      return <TableSkeleton key={index} />;
                    })}

                  <TableNoData isNotFound={!isLoading && !listEvent.length} />
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <Divider />

          <Box display="flex" justifyContent="space-between" alignItems="center" px={3}>
            <FormControlLabel
              label={t('common.table.dense')}
              control={<Switch checked={dense} onChange={onChangeDense} />}
            />
            <TablePagination
              component="div"
              rowsPerPageOptions={[5, 10, 15]}
              count={totalItems}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
              style={{ border: 'none' }}
              labelRowsPerPage={t('common.table.pagination.rowsPerPage')}
            />
          </Box>
        </Card>
      </Container>
    </Page>
  );
}
