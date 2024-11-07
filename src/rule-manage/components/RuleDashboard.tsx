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
import lodash from 'lodash';
import { useSelector } from 'react-redux';
import { TableHeadCustom, TableNoData } from 'src/common/components/table';
import useDeepEffect from 'src/common/hooks/useDeepEffect';
import useTable from '../../common/hooks/useTable';
import { useGetListRule } from '../hooks/useGetListRule';
import { RULE_TABLE_HEAD } from '../constants';
import LoadingTableSkeleton from '../../common/components/LoadingTableSkeleton';
import RuleTableRow from './RuleTableRow';

export default function ListRuleDashBoard() {
  const { useDeepCompareEffect } = useDeepEffect();
  const {
    dense,
    page,
    rowsPerPage,
    setPage,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const { data, isLoading } = useGetListRule();

  // const listRequest = DATA_LIST_USER;
  // const totalItems = data?.meta?.totalItems || 0;
  // const totalItems = 0;

  return (
    <Paper elevation={3} sx={{ padding: 2, boxShadow: 10,
      background: `linear-gradient(to right bottom, white, #ECF2FF)`,
    }}>
      <TableContainer sx={{ position: 'relative' }}>
        <Table size={dense ? 'small' : 'medium'}>
          <TableHeadCustom headLabel={RULE_TABLE_HEAD} />
          <TableBody>
            {Object.keys(data?.ruleConfig || {}).map((obj) => (
              <RuleTableRow
                key={obj}
                rowCode={obj}
                listRuleConfig={data?.ruleConfig}
              />
            ))}
            {isLoading && (
              <LoadingTableSkeleton column={RULE_TABLE_HEAD.length} row={rowsPerPage} />
            )}
            {/* <TableNoData isNotFound={!isLoading && !data?.ruleConfig?.length} /> */}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
