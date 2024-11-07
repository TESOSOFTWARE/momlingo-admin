import {
  Box,
  FormControlLabel,
  IconButton,
  Paper,
  Switch,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Tooltip,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Iconify from 'src/common/components/Iconify';
import { TableHeadCustom, TableSelectedActions } from 'src/common/components/table';
import { useSelectMultiple } from 'src/common/hooks/useSelectMultiple';
import useTable from 'src/common/hooks/useTable';
import { TABLE_HEAD_PROPS } from 'src/config-point/list-point/constant';
import { dispatch } from '../../../../common/redux/store';
import { PATH_DASHBOARD } from '../../../../common/routes/paths';
import { replacePathParams } from '../../../../common/utils/replaceParams';
import { useGetPoint } from '../../hooks/useGetPoint';
import { IPointParams } from '../../interface';
import { filtersCode, setDelPoint, setPopupDel } from '../../slice';
import ListFilter from '../ListFilter';
import ModalConfirmDelete from '../ModalConfirmDelete';
import PointTableRow from './PointTableRow';

export default function PointTable() {
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

  const dataFilter = useSelector(filtersCode);

  const searchParams: IPointParams = {
    searchText: dataFilter.searchText,
    type: dataFilter.type,
    isActive: dataFilter.isActive,
    page: page + 1,
    limit: rowsPerPage,
  };

  const { data } = useGetPoint(searchParams);
  const listPoint = data?.items || [];

  const {
    isCheckedAll,
    reset: resetSelect,
    selectedIds,
    handleSelectItem,
    handleCheckAll,
  } = useSelectMultiple(
    listPoint.map((item) => item.id),
    page + 1
  );

  const totalItems = data?.meta.totalItems || 0;

  const handleDeleteRows = (ids: number[]) => {
    dispatch(setDelPoint({ ids: ids }));
    dispatch(setPopupDel(true));
    resetSelect();
  };

  const handleEditAdmin = (id: number) => {
    navigate(replacePathParams(PATH_DASHBOARD.point.edit, { id: id }));
  };

  return (
    <>
      <Paper elevation={3}>
        <ModalConfirmDelete />
        <ListFilter onSetPage={setPage} />
        <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
          {!!selectedIds.length && (
            <TableSelectedActions
              dense={dense}
              isSelectAll={isCheckedAll}
              numSelected={selectedIds.length}
              rowCount={listPoint.length}
              onSelectAllRows={handleCheckAll}
              actions={
                <Tooltip title="Delete">
                  <IconButton
                    color="primary"
                    onClick={() => handleDeleteRows(selectedIds)}
                  >
                    <Iconify icon={'eva:trash-2-outline'} />
                  </IconButton>
                </Tooltip>
              }
            />
          )}
          <Table size={dense ? 'small' : 'medium'}>
            <TableHeadCustom
              order={order}
              orderBy={orderBy}
              rowCount={listPoint.length}
              numSelected={selectedIds.length}
              onSort={onSort}
              isSelectAll={isCheckedAll}
              onSelectAllRows={handleCheckAll}
              headLabel={TABLE_HEAD_PROPS}
            />

            <TableBody>
              {listPoint.map((row) => (
                <PointTableRow
                  key={row.id}
                  row={row}
                  selected={selectedIds.includes(row.id)}
                  onEditRow={() => handleEditAdmin(row.id)}
                  onSelectRow={(e) => handleSelectItem(row.id, e)}
                  onDeleteRow={() => handleDeleteRows([row.id])}
                />
              ))}
              {/* {Array.from(Array(rowsPerPage)).map((index) => {
                    return <AdminSkeletonTable key={index} isNotFound={isLoading} />;
                  })} */}
              {/* <TableNoData isNotFound={isNotFound} /> */}
            </TableBody>
          </Table>
        </TableContainer>
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
      </Paper>
    </>
  );
}
