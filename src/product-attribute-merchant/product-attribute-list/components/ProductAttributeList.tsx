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
import Button from '@mui/material/Button';
import lodash from 'lodash';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import Iconify from 'src/common/components/Iconify';
import {
  TableHeadCustom,
  TableNoData,
  TableSelectedActions,
} from 'src/common/components/table';
import { useSelectMultiple } from 'src/common/hooks/useSelectMultiple';
import useTable from 'src/common/hooks/useTable';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import vn from '../../../common/locales/vn';
import { dispatch } from '../../../common/redux/store';
import { replacePathParams } from '../../../common/utils/replaceParams';
import { TABLE_HEAD_PROPS } from '../constants/constants';
import { useGetProductAttribute } from '../hooks/useGetProductAttribute';
import { IProductAttributeParams } from '../interface/interface';
import { setConfirmPopup, setSelectIdsAttribute } from '../product-attribute.slice';
import ModalConfirmDelete from './ModalConfirmDelete';
import ProductAttributeTableRow from './ProductAttributeTableRow';
import TableSkeleton from './TableSkeleton';

function ProductAttributeList() {
  const navigate = useNavigate();
  const { t } = useTranslation();

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

  const searchParams: IProductAttributeParams = {
    page: page + 1,
    limit: rowsPerPage,
  };

  const { data, isLoading, isError } = useGetProductAttribute(searchParams);
  const listProductAttribute = data?.items || [];

  const totalItems = data?.meta.totalItems || 0;

  const {
    isCheckedAll,
    reset: resetSelect,
    selectedIds,
    handleSelectItem,
    handleCheckAll,
  } = useSelectMultiple(
    listProductAttribute.map((item) => item.id),
    page + 1
  );

  const handleDeleteRows = (ids: number[]) => {
    dispatch(setConfirmPopup(true));
    dispatch(setSelectIdsAttribute(ids));
    resetSelect();
  };

  const handleEditRow = (idSelect: number) => {
    navigate(replacePathParams(PATH_DASHBOARD.product_attribute.edit, { id: idSelect }));
  };

  return (
    <>
      <ModalConfirmDelete />
      <HeaderBreadcrumbs
        heading={t('attribute.list.titleList')}
        links={[
          { name: vn.home, href: PATH_DASHBOARD.root },
          {
            name: t('attribute.list.titleAttribute'),
            href: PATH_DASHBOARD.product_attribute.root,
          },
          {
            name: t('attribute.list.titleList'),
            href: PATH_DASHBOARD.product_attribute.list,
          },
        ]}
        action={
          <Button
            variant="contained"
            startIcon={<Iconify icon={'eva:plus-fill'} />}
            onClick={() => {
              navigate(PATH_DASHBOARD.product_attribute.new);
            }}
          >
            {t('attribute.list.btnCreate')}
          </Button>
        }
      />

      <Paper elevation={3} sx={{ paddingTop: 1 }}>
        <TableContainer sx={{ position: 'relative' }}>
          {!!selectedIds.length && (
            <TableSelectedActions
              dense={dense}
              isSelectAll={isCheckedAll}
              numSelected={selectedIds.length}
              rowCount={listProductAttribute.length || 0}
              onSelectAllRows={handleCheckAll}
              actions={
                <Tooltip title={vn.deleteProductAttribute}>
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
              headLabel={TABLE_HEAD_PROPS}
              rowCount={listProductAttribute.length}
              numSelected={selectedIds.length}
              isSelectAll={isCheckedAll}
              onSelectAllRows={handleCheckAll}
            />

            <TableBody>
              {listProductAttribute.map((row) => (
                <ProductAttributeTableRow
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
              {/* <TableCell colSpan={12} sx={{ p: 0 }} /> */}

              <TableSkeleton isLoading={isLoading} row={10} />
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
            label="Thu gọn"
            sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
          />
        </Box>
      </Paper>
    </>
  );
}

export { ProductAttributeList };
