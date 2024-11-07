import { Paper, Table, TableBody, TableContainer, Stack, Card } from '@mui/material';
import { TableHeadCustom } from '../../../../common/components/table';
import useTable from '../../../../common/hooks/useTable';
import { useGetConfigEvent } from '../../hooks/useGetConfigEvent';
import Scrollbar from '../../../../common/components/Scrollbar';
import { ConfigEventTableRow } from './ConfigEventTableRow';
import { TABLE_HEAD } from '../../constants';

export default function ConfigEventList() {
  const { dense, order, orderBy } = useTable();
  const { data: productList, isLoading } = useGetConfigEvent();
  console.log(productList)
  return (
    <Card
      sx={{
        padding: 2,
        background: 'linear-gradient(to right bottom, white, #ECF9FF)',
        boxShadow: 10,
      }}
    >
      <Stack spacing={3}>
        <TableContainer sx={{position: 'relative' }}>
          <Table>
            <TableHeadCustom order={order} orderBy={orderBy} headLabel={TABLE_HEAD} />
            <TableBody>
              {Object.keys(productList || {}).map((obj) => (
                <ConfigEventTableRow
                  key={obj}
                  rowCode={obj}
                  configEventList={productList}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Card>
  );
}
