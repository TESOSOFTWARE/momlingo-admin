import { Paper, Table, TableBody, TableContainer, Stack, Card } from '@mui/material';
import { TableHeadCustom } from '../../../../common/components/table';
import useTable from '../../../../common/hooks/useTable';
import { useGetConfigFeature } from '../../hooks/useGetConfigFeature';
import Scrollbar from '../../../../common/components/Scrollbar';
import { ConfigFeatureTableRow } from './ConfigFeatureTableRow';
import { TABLE_HEAD } from '../../constants';

export default function ConfigFeatureList() {
  const { dense, order, orderBy } = useTable();
  const { data: productList, isLoading } = useGetConfigFeature();
  return (
    <Card
      sx={{
        padding: 2,
        background: 'linear-gradient(to right bottom, white, #ECF9FF)',
        boxShadow: 10,
      }}
    >
      <Stack spacing={3}>
        <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
          <Table>
            <TableHeadCustom order={order} orderBy={orderBy} headLabel={TABLE_HEAD} />
            <TableBody>
              {Object.keys(productList || {}).map((obj) => (
                <ConfigFeatureTableRow
                  key={obj}
                  rowCode={obj}
                  configFeatureList={productList}
                />
              ))}
              {/* <TableNoData isNotFound={!listProductAttribute?.length} /> */}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Card>
  );
}
