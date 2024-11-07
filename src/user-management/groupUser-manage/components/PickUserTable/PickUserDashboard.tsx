import {
  Button,
  Divider,
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TablePagination
} from '@mui/material';
import lodash from 'lodash';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  TableHeadCustom,
  TableNoData,
  TableSelectedActions,
} from 'src/common/components/table';
import useDeepEffect from 'src/common/hooks/useDeepEffect';
import Scrollbar from '../../../../common/components/Scrollbar';
import { useSelectMultiple } from '../../../../common/hooks/useSelectMultiple';
import useTable from '../../../../common/hooks/useTable';
import { dispatch } from '../../../../common/redux/store';
import {
  DEFAULT_VALUE_SEARCH_USER
} from '../../../constants';
import { useGetListUser } from '../../../hooks/useGetListUser';
import { IListUserParams } from '../../../interfaces';
import { searchFormSelector, setSearchForm } from '../../../userManage.slice';
import { PICK_USER_TABLE_HEAD } from '../../constants';
import {
  ListPickUserSelector,
  isCheckAllSelector,
  setDataCheckAllUsers,
  setIsCheckAll,
  setListPickedUser,
} from '../../groupUser.slices';
import PickUserFilterBar from './PickUserFilter';
import PickUserTableRow from './PickUserTableRow';
import PickUserTableSkeleton from './PickUserTableSkeleton';

type Props = {
  onClose: VoidFunction;
};

export default function PickUserDashBoard({ onClose }: Props) {
  const { useDeepCompareEffect } = useDeepEffect();
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
  const listIdUser = useSelector(ListPickUserSelector);
  const { data, isLoading } = useGetListUser(searchParams);

  const listUser = data?.items || [];

  // const totalItems = data?.meta?.totalItems || 0;
  const totalItems = Array.isArray(data) ? data.length : 0;
  const isCheckAllUser = useSelector(isCheckAllSelector);


  const {
    isCheckedAll,
    reset: resetSelect,
    selectedIds,
    setSelectedIds,
    handleSelectItem,
    handleCheckAll,
  } = useSelectMultiple(listUser.map((item) => item.userId));

  const handleSaveSelectedUser = () => {
    dispatch(setIsCheckAll(false));
    dispatch(setListPickedUser(selectedIds));
  };

  useEffect(() => {
    setSelectedIds(listIdUser);
  }, [listIdUser]);

  const handleCheckAllUser = () => {
    setSelectedIds([]);
    dispatch(setListPickedUser([]));
    dispatch(setIsCheckAll(true));
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, boxShadow: 10 }}>
      <PickUserFilterBar />
      <Scrollbar>
        <TableContainer>
          {!!selectedIds.length && (
            <TableSelectedActions
              dense={true}
              isSelectAll={isCheckedAll}
              numSelected={selectedIds.length}
              rowCount={listUser.length}
              onSelectAllRows={handleCheckAll}
            />
          )}
          <Table size={'small'}>
            <TableHeadCustom
              headLabel={PICK_USER_TABLE_HEAD}
              rowCount={listUser.length}
              isSelectAll={isCheckedAll}
              numSelected={selectedIds.length}
              onSort={onSort}
              onSelectAllRows={handleCheckAll}
            />
            <TableBody>
              {listUser.map((row) => (
                <PickUserTableRow
                  key={row.id}
                  row={row}
                  selected={selectedIds.includes(row.userId)}
                  onSelectRow={(e) => {
                    handleSelectItem(row.userId, e);
                  }}
                />
              ))}
              {isLoading && (
                <PickUserTableSkeleton
                  row={rowsPerPage}
                  column={PICK_USER_TABLE_HEAD.length + 1}
                />
              )}
              <TableNoData isNotFound={!isLoading && !listUser?.length} />
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
      <Divider />
      <Stack sx={{ position: 'relative', justifyContent: 'flex-end' }} direction={'row'}>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={lodash.isEmpty(totalItems) ? (totalItems as number) : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={onChangePage}
          onRowsPerPageChange={onChangeRowsPerPage}
        />
      </Stack>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Button variant="contained" sx={{ textTransform: 'none' }} onClick={() => {
          handleCheckAllUser();
          // dispatch(setListPickedUser([]))
          
          dispatch(setIsCheckAll(true));
          onClose();

        }}>
          Chọn tất cả {totalItems} users
        </Button>
        <Stack direction={'row'} spacing={2} justifyContent={'end'}>
          <Button onClick={onClose} color="inherit" variant="contained">
            {t('confirmModal.cancel')}
          </Button>
          <Button
            onClick={() => {
              handleSaveSelectedUser();
              onClose();
            }}
            variant="contained"
          >
            {t('groupUser.form.add')}
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}
