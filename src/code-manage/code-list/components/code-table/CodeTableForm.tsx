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
import lodash from 'lodash';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  TableHeadCustom,
  TableNoData,
  TableSelectedActions,
} from 'src/common/components/table';
import Iconify from '../../../../common/components/Iconify';
import { useSelectMultiple } from '../../../../common/hooks/useSelectMultiple';
import useTable from '../../../../common/hooks/useTable';
import en from '../../../../common/locales/en';
import { dispatch } from '../../../../common/redux/store';
import { PATH_DASHBOARD } from '../../../../common/routes/paths';
import { searchForm, setDataDeleteCode, setPopup } from '../../../code-common/code.slice';
import { useGetCode } from '../../hooks/useGetCode';
import { HEAD_TABLE_PROPS } from '../../list.constants';
import { ICodeParams } from '../../list.interface';
import CodeTableRow from '../code-table/CodeTableRow';
import CodeFilter from '../CodeFilter';
import CodeSkeletonTable from '../CodeSkeletonTable';
import ModalConfirmDelete from '../ModalConfirmDelete';

export default function CodeTableForm() {
  const navigate = useNavigate();
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,

    selected: selectedRows,
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const searchContents = useSelector(searchForm);

  const searchParams: ICodeParams = {
    searchText: searchContents.searchText,
    searchType: searchContents.searchType,
    page: page + 1,
    limit: rowsPerPage,
  };

  const { data, isLoading } = useGetCode(searchParams);

  const listCode =
    data?.items.map((item) => {
      return item;
    }) || [];

  const {
    isCheckedAll,
    reset: resetSelect,
    selectedIds,
    handleSelectItem,
    handleCheckAll,
  } = useSelectMultiple(
    listCode.map((item) => item.code),
    page + 1
  );

  const handleDeleteRows = (code: string[]) => {
    dispatch(setDataDeleteCode(code));
    dispatch(setPopup(true));
    resetSelect();
  };

  const handleEditCode = (code: string) => {
    navigate(PATH_DASHBOARD.code.edit(code));
  };

  const totalItems = data?.meta.totalItems;

  const isNotFound = !listCode.length && !isLoading;

  return (
    <Paper elevation={3}>
      <CodeFilter />
      <ModalConfirmDelete />
      <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
        {!!selectedIds.length && (
          <TableSelectedActions
            dense={dense}
            isSelectAll={isCheckedAll}
            numSelected={selectedIds.length}
            rowCount={listCode.length}
            onSelectAllRows={handleCheckAll}
            actions={
              <Tooltip title={en.delete}>
                <IconButton color="primary" onClick={() => handleDeleteRows(selectedIds)}>
                  <Iconify icon={'eva:trash-2-outline'} />
                </IconButton>
              </Tooltip>
            }
          />
        )}

        <Table size={dense ? 'small' : 'medium'}>
          <TableHeadCustom
            headLabel={HEAD_TABLE_PROPS}
            order={order}
            orderBy={orderBy}
            rowCount={listCode.length}
            numSelected={selectedIds.length}
            onSort={onSort}
            isSelectAll={isCheckedAll}
            onSelectAllRows={handleCheckAll}
          />

          <TableBody>
            {listCode.map((row) => (
              <CodeTableRow
                key={row.code}
                row={row}
                selected={selectedIds.includes(row.code)}
                onSelectRow={(e) => handleSelectItem(row.code, e)}
                onDeleteRow={() => {
                  handleDeleteRows([row.code]);
                }}
                onEditRow={() => handleEditCode(row.code)}
              />
            ))}
            <CodeSkeletonTable isNotFound={isLoading} />
            <TableNoData isNotFound={isNotFound} />
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
  );
}
