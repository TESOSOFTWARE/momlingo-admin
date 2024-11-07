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
import UserFilterBar from './ListIntroduceUserFilter';
import { IListUserIntroduceParams, IListUserParams } from '../../interfaces';
import useTable from '../../../common/hooks/useTable';
import {
  searchFormIntroduceSelector,
  searchFormSelector,
  setFilterParamsIntroduced,
  setSearchForm,
  setSearchFormIntroduce,
} from '../../userManage.slice';
import { useEffect } from 'react';
import { dispatch } from '../../../common/redux/store';
import {
  DATA_LIST_USER,
  DEFAULT_VALUE_SEARCH_INTRODUCE,
  DEFAULT_VALUE_SEARCH_USER,
  INTRODUCE_USER_TABLE_HEAD,
  USER_TABLE_HEAD,
} from '../../constants';
import { useGetListUser } from '../../hooks/useGetListUser';
import IntroduceUserTableRow from './ListIntroduceUserTableRow';
import ListIntroduceUserTableSkeleton from './ListIntroduceUserTableSkeleton';
import { useGetHistoryUser } from '../../hooks/useGetHistoryUser';

export default function ListIntroduceUserDashBoard() {
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

  const searchData = useSelector(searchFormIntroduceSelector);
  const searchParams: IListUserIntroduceParams = {
    page: page + 1,
    limit: rowsPerPage,
    referrerName: searchData.referrerName === '' ? undefined : searchData.referrerName,
    phoneNumber: searchData.phoneNumber === '' ? undefined : searchData.phoneNumber,
    minReferralDate:
      searchData.minReferralDate === '' ? undefined : searchData.minReferralDate,
    maxReferralDate:
      searchData.maxReferralDate === '' ? undefined : searchData.maxReferralDate,
  };

  useDeepCompareEffect(() => {
    searchParams && dispatch(setFilterParamsIntroduced(searchParams));
    return () => {
      dispatch(setSearchFormIntroduce(DEFAULT_VALUE_SEARCH_INTRODUCE));
    };
  }, [searchParams]);

  useDeepCompareEffect(() => {
    if (searchData) {
      setPage(0);
    }
  }, [searchData]);

  const { data, isLoading } = useGetHistoryUser(searchParams);

  const listRequest = data?.items || [];

  const totalItems = data?.meta?.totalItems || 0;

  return (
    <Paper elevation={3} sx={{ paddingTop: 3, boxShadow: 10 }}>
      <UserFilterBar onSetPage={setPage} />
      <TableContainer sx={{ position: 'relative' }}>
        <Table size={dense ? 'small' : 'medium'}>
          <TableHeadCustom
            headLabel={INTRODUCE_USER_TABLE_HEAD}
            rowCount={listRequest.length}
          />
          <TableBody>
            {listRequest.map((row) => (
              <IntroduceUserTableRow key={row.id} row={row} />
            ))}
            {isLoading && (
              <ListIntroduceUserTableSkeleton isLoading={isLoading} row={rowsPerPage} />
            )}
            <TableNoData isNotFound={!isLoading && !listRequest?.length} />
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
