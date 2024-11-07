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
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Iconify from '../../../common/components/Iconify';
import {
  TableHeadCustom,
  TableNoData,
  TableSelectedActions,
} from '../../../common/components/table';
import useMessage from '../../../common/hooks/useMessage';
import { useSelectMultiple } from '../../../common/hooks/useSelectMultiple';
import useTable from '../../../common/hooks/useTable';
import en from '../../../common/locales/en';
import { dispatch } from '../../../common/redux/store';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import { replacePathParams } from '../../../common/utils/replaceParams';
import { HEAD_TABLE_PROPS } from '../constant';
import { useDeleteTerm } from '../hooks/useDeleteTerm';
import { useGetAttributeTerm } from '../hooks/useGetAttributeTerm';
import { IListTermParams } from '../interface';
import { setIsPopup, setSelectId } from '../slice';
import ListTermTableRow from './ListTermTableRow';
import ModalConfirmDelete from './ModalConfirmDelete';
import SkeletonTable from './SkeletonTable';

export default function ListTermTable() {
  const navigate = useNavigate();
  const { t } = useTranslation();
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

  const searchParams: IListTermParams = {
    page: page + 1,
    limit: rowsPerPage,
  };

  const { data, isLoading, isError } = useGetAttributeTerm(searchParams);
  const listTerm = data?.items || [];

  const {
    isCheckedAll,
    reset: resetSelect,
    selectedIds,
    handleSelectItem,
    handleCheckAll,
  } = useSelectMultiple(
    listTerm.map((item) => {
      return item.id;
    }) || [],
    page + 1
  );

  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  // const { mutate } = useDeleteTerm({
  //   onSuccess: () => showSuccessSnackbar(t('term.list.deleteSuccess')),
  //   onError: () => showErrorSnackbar(t('term.list.deleteFail')),
  // });

  const handleDeleteRows = (ids: number[]) => {
    dispatch(setSelectId(ids));
    dispatch(setIsPopup(true));
    resetSelect();
  };

  const handleEditCode = (id: number) => {
    navigate(replacePathParams(PATH_DASHBOARD.product_attribute_term.edit, { id: id }));
  };

  const totalItems = data?.meta.totalItems || 0;

  return (
    <Paper elevation={3} sx={{ paddingTop: 1 }}>
      <ModalConfirmDelete />
      <TableContainer sx={{ position: 'relative' }}>
        {!!selectedIds.length && (
          <TableSelectedActions
            dense={dense}
            isSelectAll={isCheckedAll}
            numSelected={selectedIds.length}
            rowCount={listTerm.length || 0}
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
            rowCount={listTerm.length}
            numSelected={selectedIds.length}
            isSelectAll={isCheckedAll}
            onSelectAllRows={handleCheckAll}
          />

          <TableBody>
            {listTerm.map((row) => (
              <ListTermTableRow
                key={row.id}
                row={row}
                selected={selectedIds.includes(row.id)}
                onSelectRow={(e) => handleSelectItem(row.id, e)}
                onDeleteRow={() => {
                  handleDeleteRows([row.id]);
                }}
                onEditRow={() => handleEditCode(row.id)}
              />
            ))}
            <SkeletonTable isLoading={isLoading} row={10} />
            <TableNoData isNotFound={isError} />
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
