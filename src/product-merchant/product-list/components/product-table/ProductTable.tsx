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
import vn from '../../../../common/locales/vn';
import { dispatch } from '../../../../common/redux/store';
import { PATH_DASHBOARD } from '../../../../common/routes/paths';
import { replacePathParams } from '../../../../common/utils/replaceParams';
import { useDeleteProduct } from '../../hooks/useDeleteProduct';
import { useGetProduct } from '../../hooks/useGetProduct';
import { HEAD_TABLE_PROPS } from '../../product-constant';
import { IProductParams } from '../../product-interface';
import { dataFilter, setIdDelete, setPopup } from '../../product-slice';
import ModalConfirmDelete from '../ModalConfirmDelete';
import ProductFilter from '../ProductFilter';
import TableSkeleton from '../SkeletonTable';
import ProductTableRow from './ProductTableRow';

export default function ProductTable() {
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
  const dataSearch = useSelector(dataFilter);

  const searchParams: IProductParams = {
    searchText: dataSearch.searchText,
    searchType: dataSearch.searchType,
    taxStatus: dataSearch.taxStatus,
    productStatus: dataSearch.productStatus,
    productType: dataSearch.productType,
    page: page + 1,
    limit: rowsPerPage,
  };

  const { data: productList, isLoading, isError } = useGetProduct(searchParams);

  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const { mutate } = useDeleteProduct({
    onSuccess: () => {
      showSuccessSnackbar(vn.ListProduct.deleteSuccess);
    },
    onError: () => {
      showErrorSnackbar(vn.ListProduct.deleteFail);
    },
  });

  const navigate = useNavigate();
  const {
    isCheckedAll,
    reset: resetSelect,
    selectedIds,
    handleSelectItem,
    handleCheckAll,
  } = useSelectMultiple(productList?.items?.map((pd) => pd.id) || [], page + 1);

  const handleDeleteRows = (id: number[]) => {
    dispatch(setIdDelete(id));
    dispatch(setPopup(true));
    resetSelect();
  };
  const handleEditProduct = (idProduct: number) => {
    navigate(replacePathParams(PATH_DASHBOARD.product.edit, { id: idProduct }));
  };
  const handleDetailProduct = (idProduct: number) => {
    navigate(replacePathParams(PATH_DASHBOARD.product.detail, { id: idProduct }));
  };

  const totalItem = productList?.totalItems || 0;

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <ProductFilter onSetPage={setPage} />
      <ModalConfirmDelete />
      <TableContainer sx={{ position: 'relative' }}>
        {!!selectedIds.length && (
          <TableSelectedActions
            dense={dense}
            isSelectAll={isCheckedAll}
            numSelected={selectedIds.length}
            rowCount={productList?.items?.length || 0}
            onSelectAllRows={handleCheckAll}
            actions={
              <Tooltip title={vn.ListProduct.delete}>
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
            rowCount={productList?.items?.length}
            numSelected={selectedIds.length}
            isSelectAll={isCheckedAll}
            onSelectAllRows={handleCheckAll}
          />
          <TableBody>
            {productList?.items?.map((row: any) => (
              <ProductTableRow
                key={row.id}
                row={row}
                selected={selectedIds.includes(row.id)}
                onSelectRow={(e) => handleSelectItem(row.id, e)}
                onDeleteRow={() => {
                  handleDeleteRows([row.id]);
                }}
                onEditRow={() => handleEditProduct(row.id)}
                onDetailRow={() => handleDetailProduct(row.id)}
              />
            ))}
            <TableSkeleton isLoading={isLoading} row={10} />
            <TableNoData isNotFound={isError} />
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
          label={'Thu gọn'}
          sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
        />
      </Box>
    </Paper>
  );
}
