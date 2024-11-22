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
import { useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { TableHeadCustom } from '../../../../../common/components/table';
import { QUERY_KEYS } from '../../../../../common/constants/queryKeys.constant';
import useTable from '../../../../../common/hooks/useTable';
import { PATH_DASHBOARD } from '../../../../../common/routes/paths';
import { replacePathParams } from '../../../../../common/utils/replaceParams';
import { TABLE_HEAD_PHYSICAL, TABLE_HEAD_VOUCHER } from '../../../constant';
import { IDetailOrder, IOrderLine } from '../../../interface';
import ProductInfoTableRow from './ProducInfoTableRow';
import { EnumType } from '../../../../common/interface';
import VoucherProductInfoTableRow from './VoucherProducInfoTableRow';

type idProps = {
  dataOrder?: IOrderLine[];
  type?: string;
};

export default function ProductInfoTable({ type, dataOrder }: idProps) {
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
  const { id: idOrder } = useParams();
  const navigate = useNavigate();
  const infoProduct = dataOrder || [];
  const totalItem = infoProduct.length || 0;

  const handleDetailRow = (idDetail: number) => {
    navigate(
      replacePathParams(PATH_DASHBOARD.order_management.detailProd, {
        id: idOrder,
        idProd: idDetail,
      })
    );
  };
  return (
    <Paper elevation={3} sx={{ pt: 1 }}>
      <TableContainer sx={{ position: 'relative' }}>
        <Table size={'small'}>
          <TableHeadCustom
            headLabel={
              type === EnumType.PHYSICAL ? TABLE_HEAD_PHYSICAL : TABLE_HEAD_VOUCHER
            }
            rowCount={infoProduct.length}
          />
          {type === EnumType.PHYSICAL ? (
            <TableBody>
              {infoProduct.map((row) => (
                <ProductInfoTableRow
                  key={row.product.id}
                  row={row}
                  onDetailRow={() => handleDetailRow(row.product.id)}
                />
              ))}
            </TableBody>
          ) : (
            <TableBody>
              {infoProduct.map((row) => (
                <VoucherProductInfoTableRow
                  key={row.product.id}
                  row={row}
                  onDetailRow={() => handleDetailRow(row.product.id)}
                />
              ))}
            </TableBody>
          )}
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
      </Box>
    </Paper>
  );
}
