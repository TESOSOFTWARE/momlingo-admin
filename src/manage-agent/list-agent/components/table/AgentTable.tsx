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
import Iconify from '../../../../common/components/Iconify';
import {
  TableHeadCustom,
  TableNoData,
  TableSelectedActions,
} from '../../../../common/components/table';
import useMessage from '../../../../common/hooks/useMessage';
import { useSelectMultiple } from '../../../../common/hooks/useSelectMultiple';
import useTable from '../../../../common/hooks/useTable';
import en from '../../../../common/locales/en';
import { dispatch } from '../../../../common/redux/store';
import { PATH_DASHBOARD } from '../../../../common/routes/paths';
import { replacePathParams } from '../../../../common/utils/replaceParams';
import { HEAD_TABLE_PROPS } from '../../constant';
import { useDeleteAgent } from '../../hooks/useDeleteAgent';
import { useGetAgent } from '../../hooks/useGetAgent';
import { IListAgentParams } from '../../interface';
import { filter, setDeletePopup, setIdDelete } from '../../slice';
import ListAgentFilter from '../ListAgentFilter';
import ModalConfirmDelete from '../ModalConfirmDelete';
import TableSkeleton from '../TableSkeleton';
import AgentTableRow from './AgentTableRow';

export default function AgentTable() {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    selected: selectedRows,
    setPage,
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const dataFilter = useSelector(filter);

  const searchParams: IListAgentParams = {
    status: dataFilter.status,
    searchText: dataFilter.searchText,
    page: page + 1,
    limit: rowsPerPage,
  };

  const { data: agentList, isLoading, isError } = useGetAgent(searchParams);

  const navigate = useNavigate();
  const {
    isCheckedAll,
    reset: resetSelect,
    selectedIds,
    handleSelectItem,
    handleCheckAll,
  } = useSelectMultiple(agentList?.items?.map((_item) => _item.id) || [], page + 1);

  const handleDeleteRows = (id: number[]) => {
    dispatch(setIdDelete({ ids: [...id] }));
    dispatch(setDeletePopup(true));
    resetSelect();
  };

  const handleEditRow = (idAgent: number) => {
    navigate(replacePathParams(PATH_DASHBOARD.manageAgent.edit, { id: idAgent }));
  };

  const isNotFound = !agentList?.items?.length;
  const totalItem = agentList?.meta.totalItems || 0;

  return (
    <Paper elevation={3}>
      <ListAgentFilter onSetPage={setPage} />
      <ModalConfirmDelete />
      <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
        {!!selectedIds.length && (
          <TableSelectedActions
            dense={dense}
            isSelectAll={isCheckedAll}
            numSelected={selectedIds.length}
            rowCount={agentList?.items?.length || 0}
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
            rowCount={agentList?.items?.length}
            numSelected={selectedIds.length}
            isSelectAll={isCheckedAll}
            onSelectAllRows={handleCheckAll}
          />
          <TableBody>
            {agentList?.items?.map((row) => (
              <AgentTableRow
                key={row.id}
                row={row}
                selected={selectedIds.includes(row.id)}
                onSelectRow={(e) => handleSelectItem(row.id, e)}
                onDeleteRow={() => {
                  handleDeleteRows([row.id]);
                }}
                onEditRow={() => handleEditRow(row.id)}
              />
            ))}
            <TableNoData isNotFound={isError} />
            <TableSkeleton isLoading={isLoading} row={10} />
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ position: 'relative' }}>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={totalItem}
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
