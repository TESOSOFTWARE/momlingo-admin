import {
  Box,
  Container,
  Divider,
  FormControlLabel,
  Paper,
  Switch,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Tooltip,
  Card,
  IconButton,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import Page from '../../common/components/Page';
import {
  TableHeadCustom,
  TableNoData,
  TableSkeleton,
  TableSelectedActions,
} from '../../common/components/table';
import Iconify from 'src/common/components/Iconify';
import useSettings from '../../common/hooks/useSettings';
import useTable from '../../common/hooks/useTable';
import GroupPolicyTableRow from './components/GroupPolicyTableRow';
import { HEAD_LABELS } from '../common/constant';
import { useGetListGroupPolicy } from './hooks/useGetListGroupPolicy';
import { useSelector, dispatch } from '../../common/redux/store';
import { ConfirmModal } from '../../common/components/modal/ConfirmModal';
import {
  closeConfirmModal,
  setConfirmModal,
  setSearchStatus,
  setSearchText,
  setSearchType,
} from '../common/group-policy.slice';
import { IGroupPolicy, ISearchParams } from '../common/interface';
import { useDeleteSingleGroupPolicy } from './hooks/useDeleteSingleGroupPolicy';
import GroupPolicyToolbar from './components/GroupPolicyTableToolbar';
import useDebounce from 'src/winning-history/hooks/useDebounce';
import GroupPolicyHeader from './components/GroupPolicyHeader';
import { useSelectMultiple } from 'src/common/hooks/useSelectMultiple';
import { useNavigate } from 'react-router-dom';
import { replacePathParams } from 'src/common/utils/replaceParams';
import { useDeleteMultipleGroupPolicy } from './hooks/useDeleteMultipleGroupPolicy';
import { PATH_DASHBOARD } from '../../common/routes/paths';

export default function GroupPolicyList() {
  const { confirmModal, searchText, searchType, searchStatus } = useSelector(
    (state) => state.groupPolicy
  );
  const { t } = useTranslation();
  const { themeStretch } = useSettings();
  const navigate = useNavigate();
  const {
    page,
    dense,
    rowsPerPage,
    setPage,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const searchParams: ISearchParams = {
    page: page + 1,
    limit: rowsPerPage,
  };

  const debouncedSearchText = useDebounce<string>(searchText, 500);

  if (debouncedSearchText.length > 2) {
    searchParams.searchText = debouncedSearchText;
  }
  if (searchStatus) {
    searchParams.status = searchStatus;
  }
  if (searchType) {
    searchParams.type = searchType;
  }

  const handleFilterName = (value: string) => {
    dispatch(setSearchText(value));
    setPage(0);
  };

  const handleFilterStatus = (value: string) => {
    dispatch(setSearchStatus(value));
    setPage(0);
  };

  const handleFilterType = (value: string) => {
    dispatch(setSearchType(value));
    setPage(0);
  };
  const { data, isLoading, isError } = useGetListGroupPolicy({
    ...searchParams,
  });

  const groupPolicyList = data?.items || [];
  const isNotFound = (!isLoading && !groupPolicyList.length) || isError;
  const totalItems = data?.meta.totalItems || 0;

  const { mutate: deleteSingleGroupPolicy } = useDeleteSingleGroupPolicy();

  const { mutateAsync: deleteMultipleGroupPolicy } = useDeleteMultipleGroupPolicy();
  const {
    isCheckedAll,
    reset: resetSelect,
    selectedIds,
    handleSelectItem,
    handleCheckAll,
    setSelectedIds,
  } = useSelectMultiple(
    groupPolicyList.map((item) => item.id),
    page + 1
  );
  const handleCloseDeleteModal = () => {
    dispatch(closeConfirmModal());
  };

  const handleDeleteSingle = (group: IGroupPolicy) => {
    dispatch(
      setConfirmModal({
        isOpen: true,
        text: t('group_policy.list.delete.content', { groupName: group.name }),
        callback: () => {
          deleteSingleGroupPolicy(group.id);
          setSelectedIds(selectedIds.filter((item) => item !== group.id));
        },
      })
    );
  };

  const handleDeleteMultiple = () => {
    dispatch(
      setConfirmModal({
        isOpen: true,
        text: t('group_policy.list.delete.multiple_content', {
          length: selectedIds.length,
        }),
        callback: async () => {
          await deleteMultipleGroupPolicy(selectedIds);
          resetSelect();
        },
      })
    );
  };
  return (
    <Page title={t('group_policy.root')}>
      <Container maxWidth={themeStretch ? 'sm' : 'xl'}>
        <GroupPolicyHeader />

        <ConfirmModal
          isOpen={confirmModal.isOpen}
          onClose={handleCloseDeleteModal}
          onSubmit={confirmModal.callback}
          text={confirmModal.text}
          type="delete"
        />

        <Card sx={{ padding: 1}}>
          <GroupPolicyToolbar
            filterName={searchText}
            filterStatus={searchStatus || ''}
            filterType={searchType || ''}
            onFilterName={handleFilterName}
            onFilterStatus={handleFilterStatus}
            onFilterType={handleFilterType}
          />

          <TableContainer sx={{ position: 'relative' }}>
            {!!selectedIds.length && (
              <TableSelectedActions
                dense={dense}
                isSelectAll={isCheckedAll}
                numSelected={selectedIds.length}
                rowCount={groupPolicyList.length}
                onSelectAllRows={handleCheckAll}
                actions={
                  <Tooltip title={t('common.tooltip.delete.title')}>
                    <IconButton color="primary" onClick={handleDeleteMultiple}>
                      <Iconify icon={'eva:trash-2-outline'} />
                    </IconButton>
                  </Tooltip>
                }
              />
            )}
            <Paper sx={{ paddingTop: '10px' }}>
              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  headLabel={HEAD_LABELS}
                  rowCount={groupPolicyList.length}
                />
                <TableBody>
                  {groupPolicyList.map((item) => (
                    <GroupPolicyTableRow
                      key={item.id}
                      row={item}
                      selected={selectedIds.includes(item.id)}
                      onSelectRow={(checked) => handleSelectItem(item.id, checked)}
                      onEditRow={() => {
                        navigate(
                          replacePathParams(PATH_DASHBOARD.groupPolicy.edit, {
                            id: item?.id,
                          })
                        );
                      }}
                      onDeleteRow={() => handleDeleteSingle(item)}
                    />
                  ))}

                  {isLoading &&
                    Array.from(Array(rowsPerPage).keys()).map((index) => {
                      return <TableSkeleton key={index} />;
                    })}

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </Paper>
          </TableContainer>
          <Divider />
          <Box display="flex" justifyContent="space-between" alignItems="center" px={3}>
            <FormControlLabel
              label={t('common.table.dense')}
              control={<Switch checked={dense} onChange={onChangeDense} />}
            />
            <TablePagination
              component="div"
              rowsPerPageOptions={[5, 10, 15]}
              count={totalItems}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
              style={{ border: 'none' }}
              labelRowsPerPage={t('common.table.pagination.rowsPerPage')}
            />
          </Box>
        </Card>
      </Container>
    </Page>
  );
}
