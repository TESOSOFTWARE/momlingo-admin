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
import UserFilterBar from './ListUserFilter';
import { IListUserParams, IUser } from '../../interfaces';
import useTable from '../../../common/hooks/useTable';
import { searchFormSelector, setSearchForm } from '../../userManage.slice';
import { useEffect } from 'react';
import { dispatch } from '../../../common/redux/store';
import {
  DATA_LIST_USER,
  DEFAULT_VALUE_SEARCH_USER,
  USER_TABLE_HEAD,
} from '../../constants';
import { useGetListUser } from '../../hooks/useGetListUser';
import UserTableRow from './ListUserTableRow';
import ListUserTableSkeleton from './ListUserTableSkeleton';

export default function ListUserDashBoard() {
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

  const searchData = useSelector(searchFormSelector);

  const searchParams: IListUserParams = {
    page: page + 1,
    limit: rowsPerPage,
    name: searchData.name === '' ? undefined : searchData.name,
    tierCode: searchData.tierCode === '' ? undefined : searchData.tierCode,
    email: searchData.email === '' ? undefined : searchData.email,
    phoneNumber: searchData.phoneNumber === '' ? undefined : searchData.phoneNumber,
    accountStatus: searchData.accountStatus === '' ? undefined : searchData.accountStatus,
  };

  useEffect(() => {
    return () => {
      dispatch(setSearchForm(DEFAULT_VALUE_SEARCH_USER));
    };
  }, []);

  useDeepCompareEffect(() => {
    if (searchData) {
      setPage(0);
    }
  }, [searchData]);

  const { data, isLoading } = useGetListUser(searchParams);

  const listRequest = data || [];
  console.log(listRequest);

  // const listRequest = DATA_LIST_USER;
  const totalItems = Array.isArray(listRequest) ? listRequest.length : 0;

  // const totalItems = 0;

  return (
    <Paper elevation={3} sx={{ paddingTop: 3, boxShadow: 10 }}>
      <UserFilterBar onSetPage={setPage} />
      <TableContainer sx={{ position: 'relative' }}>
        <Table size={dense ? 'small' : 'medium'}>
          <TableHeadCustom headLabel={USER_TABLE_HEAD} rowCount={Array.isArray(listRequest) ? listRequest.length : 0} />

          <TableBody>
            {Array.isArray(listRequest) && listRequest.map((row: IUser) => (
              <UserTableRow key={row.id} row={row} />
            ))}
            {isLoading && (
              <ListUserTableSkeleton isLoading={isLoading} row={rowsPerPage} />
            )}
            <TableNoData isNotFound={!isLoading && Array.isArray(listRequest) && listRequest.length === 0} />
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
