import {
  Box,
  FormControlLabel,
  Paper,
  Switch,
  Table,
  TableBody,
  TablePagination,
  TableContainer,
} from '@mui/material';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { TableHeadCustom, TableNoData } from 'src/common/components/table';
import useDeepEffect from 'src/common/hooks/useDeepEffect';
import { useSelectMultiple } from '../../../common/hooks/useSelectMultiple';
import useTable from '../../../common/hooks/useTable';
import { dispatch, useSelector } from '../../../common/redux/store';
import { TABLE_HEAD } from '../../constants';
import { IFilterForm, IListFeedbackParams } from '../../interface';
import { setSearchParams } from '../../slice';
import { useGetListFeedback } from '../hooks/useGetListFeedback';
import FeedbackTableRow from './FeedbackTableRow';
import FeedbackTableSkeleton from './FeedbackTableSkeleton';
import FeedbackFilter from './FeedbackFilter';
import lodash from 'lodash';

export default function FeedbackTableForm() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { confirmModal } = useSelector((state) => state.feedback);

  const { useDeepCompareEffect } = useDeepEffect();
  const {
    dense,
    page,
    rowsPerPage,
    setPage,
    orderBy,
    order,
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();
  const { searchParams } = useSelector((state) => state.feedback);
  const search = {
    phone: searchParams.phone
      ? encodeURIComponent(searchParams.phone as string)
      : searchParams.phone,
    name: searchParams.name,
    startDate: searchParams.startDate,
    endDate: searchParams.endDate,
    type: searchParams.type,
  };
  const searchParam: IListFeedbackParams = {
    page: page + 1,
    limit: rowsPerPage,
    ...search,
  };
  useDeepCompareEffect(() => {
    if (search) {
      setPage(0);
    }
  }, [search]);
  useEffect(() => {
    dispatch(setSearchParams(searchParam));
    return () => {
      dispatch(
        setSearchParams({
          phone: undefined,
          name: undefined,
          startDate: undefined,
          endDate: undefined,
          type: undefined,
        })
      );
    };
  }, []);

  const { data, isLoading } = useGetListFeedback(searchParam);

  const listFeedback = data?.items || [];
  const totalItems = data?.meta?.totalItems || 0;
  const {
    isCheckedAll,
    reset: resetSelect,
    selectedIds,
    setSelectedIds,
    handleSelectItem,
    handleCheckAll,
  } = useSelectMultiple(
    listFeedback.map((item) => item.id),
    page + 1
  );

  return (
    <Paper elevation={3} sx={{ paddingTop: 3 }}>
      <FeedbackFilter onSetPage={setPage} />
      <TableContainer sx={{ position: 'relative' }}>
        <Table size={dense ? 'small' : 'medium'}>
          <TableHeadCustom
            order={order}
            orderBy={orderBy}
            headLabel={TABLE_HEAD}
            rowCount={listFeedback.length}
            onSort={onSort}
          />
          <TableBody>
            {listFeedback.map((row) => (
              <FeedbackTableRow
                key={row.id}
                row={row}
                selected={selectedIds.includes(row.id)}
                onSelectRow={(e) => {
                  handleSelectItem(row.id, e);
                }}
              />
            ))}
            {isLoading && (
              <FeedbackTableSkeleton isLoading={isLoading} row={rowsPerPage} />
            )}

            <TableNoData isNotFound={!isLoading && !listFeedback?.length} />
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
