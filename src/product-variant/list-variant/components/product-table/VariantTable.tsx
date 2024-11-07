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
import { IListVariantParams } from '../../../new-variant/interface';
import { HEAD_TABLE_PROPS } from '../../constant';
import { useDeleteVariant } from '../../hooks/useDeleteVariant';
import { useGetVariant } from '../../hooks/useGetVariant';
import { setIsPopup, setSelectId } from '../../slice';
import ModalConfirmDelete from '../ModalConfirmDelete';
import TableSkeleton from './SkeletonTable';
import VariantTableRow from './VariantTableRow';

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

  // const dataSearch = useSelector(dataFilter);

  // const searchParams: IProductParams = {
  //   searchText: dataSearch.searchText,
  //   searchType: dataSearch.searchType,
  //   taxStatus: dataSearch.taxStatus,
  //   status: dataSearch.status,
  //   page: page + 1,
  //   limit: rowsPerPage
  // };

  const searchParams: IListVariantParams = {
    page: page + 1,
    limit: rowsPerPage,
  };

  const { data: variantList, isLoading, isError } = useGetVariant(searchParams);

  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  // const { mutate } = useDeleteProduct({
  //   onSuccess: () => {
  //     showSuccessSnackbar(en.ListProduct.deleteSuccess);
  //   },
  //   onError: () => {
  //     showErrorSnackbar(en.ListProduct.deleteFail);
  //   }
  // });

  const navigate = useNavigate();
  const {
    isCheckedAll,
    reset: resetSelect,
    selectedIds,
    handleSelectItem,
    handleCheckAll,
  } = useSelectMultiple(variantList?.items?.map((v) => v.id) || [], page + 1);

  const handleDeleteRows = (id: number[]) => {
    dispatch(setIsPopup(true));
    dispatch(setSelectId(id));
    resetSelect();
  };

  const handleEditProduct = (idProduct: number) => {
    navigate(replacePathParams(PATH_DASHBOARD.product_variant.edit, { id: idProduct }));
  };

  const totalItem = variantList?.meta.totalItems || 0;

  return (
    <Paper elevation={3} sx={{ paddingTop: 1 }}>
      <ModalConfirmDelete />
      <TableContainer sx={{ position: 'relative' }}>
        {!!selectedIds.length && (
          <TableSelectedActions
            dense={dense}
            isSelectAll={isCheckedAll}
            numSelected={selectedIds.length}
            rowCount={variantList?.items?.length || 0}
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
            rowCount={variantList?.items?.length}
            numSelected={selectedIds.length}
            isSelectAll={isCheckedAll}
            onSelectAllRows={handleCheckAll}
          />
          <TableBody>
            {variantList?.items?.map((row) => (
              <VariantTableRow
                key={row.id}
                row={row}
                selected={selectedIds.includes(row.id)}
                onSelectRow={(e) => handleSelectItem(row.id, e)}
                onDeleteRow={() => {
                  handleDeleteRows([row.id]);
                }}
                onEditRow={() => handleEditProduct(row.id)}
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
          label="Thu gọn"
          sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
        />
      </Box>
    </Paper>
  );
}
