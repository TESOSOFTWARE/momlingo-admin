import {
  Box,
  FormControlLabel,
  Paper,
  Switch,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
} from '@mui/material';
import { useSelector } from 'react-redux';
import {
  TableHeadCustom,
  TableSelectedActions,
} from '../../../../../common/components/table';
import useDeepEffect from '../../../../../common/hooks/useDeepEffect';
import { useSelectMultiple } from '../../../../../common/hooks/useSelectMultiple';
import useTable from '../../../../../common/hooks/useTable';
import { dispatch } from '../../../../../common/redux/store';
import { IListVariantParams } from '../../../../../product-variant/new-variant/interface';
import { selectVariantId } from '../../../../product-edit/slice';
import { HEAD_TABLE_PROPS } from '../../../constant';
import { useGetVariant } from '../../../hooks/useGetVariant';
import { setSelectVariantId } from '../../../slice';
import VariantRow from './VariantRow';

export default function VariantTable() {
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

  const searchParams: IListVariantParams = {
    page: page + 1,
    limit: rowsPerPage,
  };

  const { data: variantList } = useGetVariant(searchParams);

  const {
    isCheckedAll,
    reset: resetSelect,
    selectedIds,
    handleSelectItem,
    setSelectedIds,
    handleCheckAll,
  } = useSelectMultiple(variantList?.items?.map((v) => v.id) || [], page + 1);

  const totalItem = variantList?.meta.totalItems || 0;

  const { useDeepCompareEffect } = useDeepEffect();

  // edit-product
  const selectId = useSelector(selectVariantId);
  useDeepCompareEffect(() => {
    setSelectedIds(selectId);
  }, [selectId]);

  // common
  useDeepCompareEffect(() => {
    dispatch(setSelectVariantId(selectedIds));
  }, [selectedIds]);

  return (
    <Paper elevation={3} sx={{ paddingTop: 3, minWidth: '800px' }}>
      <TableContainer sx={{ position: 'relative', minWidth: '800px' }}>
        {!!selectedIds.length && (
          <TableSelectedActions
            dense={dense}
            isSelectAll={isCheckedAll}
            numSelected={selectedIds.length}
            rowCount={variantList?.items?.length || 0}
            onSelectAllRows={handleCheckAll}
          />
        )}
        <Table size={dense ? 'small' : 'medium'}>
          <TableHeadCustom
            headLabel={HEAD_TABLE_PROPS}
            order={order}
            orderBy={orderBy}
            rowCount={variantList?.items?.length}
            numSelected={selectedIds.length}
            onSort={onSort}
            isSelectAll={isCheckedAll}
            onSelectAllRows={handleCheckAll}
          />
          <TableBody>
            {variantList?.items?.map((row) => (
              <VariantRow
                key={row.id}
                row={row}
                selected={selectedIds.includes(row.id)}
                onSelectRow={(e) => handleSelectItem(row.id, e)}
              />
            ))}
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
