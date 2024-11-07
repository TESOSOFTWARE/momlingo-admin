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
import { useSelector, dispatch } from '../../common/redux/store';
import { ConfirmModal } from '../../common/components/modal/ConfirmModal';
import useDebounce from 'src/winning-history/hooks/useDebounce';
import { useSelectMultiple } from 'src/common/hooks/useSelectMultiple';
import { useNavigate } from 'react-router-dom';
import { replacePathParams } from 'src/common/utils/replaceParams';
import { PATH_DASHBOARD } from '../../common/routes/paths';
import { ITermPolicy, ISearchParams, ITermPolicyRow } from '../common/interface';
import {
  closeConfirmModal,
  setConfirmModal,
  setSearchStatus,
  setSearchText,
  setSearchType,
} from '../common/terms-policy.slice';
import { useGetListTermPolicy } from './hooks/useGetListTermPolicy';
import { useDeleteSingleTermPolicy } from './hooks/useDeleteSingleTermPolicy';
import { useDeleteMultipleTermPolicy } from './hooks/useDeleteMultipleTermPolicy';
import TermPolicyHeader from './components/TermPolicyHeader';
import TermPolicyToolbar from './components/TermPolicyTableToolbar';
import { HEAD_LABELS } from '../common/constant';
import TermPolicyTableRow from './components/TermPolicyTableRow';

export default function PolicyList() {
  const { confirmModal, searchText, searchType, searchStatus } = useSelector(
    (state) => state.termsPolicy
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
  const { data, isLoading, isError } = useGetListTermPolicy({
    ...searchParams,
  });

  const termPolicyList = data?.items || [];
  const isNotFound = (!isLoading && !termPolicyList.length) || isError;
  const totalItems = data?.meta.totalItems || 0;

  const { mutate: deleteSingleTermPolicy } = useDeleteSingleTermPolicy();

  const { mutateAsync: deleteMultipleTermPolicy } = useDeleteMultipleTermPolicy();
  const {
    isCheckedAll,
    reset: resetSelect,
    selectedIds,
    handleSelectItem,
    handleCheckAll,
    setSelectedIds,
  } = useSelectMultiple(
    termPolicyList.map((item) => item.id),
    page + 1
  );

  const handleCloseDeleteModal = () => {
    dispatch(closeConfirmModal());
  };

  const handleDeleteSingle = (termPolicy: ITermPolicyRow) => {
    dispatch(
      setConfirmModal({
        isOpen: true,
        text: t('termPolicy.common.delete.content', { name: termPolicy.id }),
        callback: () => {
          deleteSingleTermPolicy(termPolicy.id);
          setSelectedIds(selectedIds.filter((item) => item !== termPolicy.id));
        },
      })
    );
  };

  const handleDeleteMultiple = () => {
    dispatch(
      setConfirmModal({
        isOpen: true,
        text: t('termPolicy.common.delete.multiple_content', {
          length: selectedIds.length,
        }),
        callback: async () => {
          await deleteMultipleTermPolicy(selectedIds);
          resetSelect();
        },
      })
    );
  };

  return (
    <Page title={t('termPolicy.list.root')}>
      <Container maxWidth={themeStretch ? 'sm' : 'xl'}>
        <TermPolicyHeader />

        <Paper elevation={3} sx={{ paddingTop: '10px' }}>
          <ConfirmModal
            isOpen={confirmModal.isOpen}
            onClose={handleCloseDeleteModal}
            onSubmit={confirmModal.callback}
            text={confirmModal.text}
            type="delete"
          />

          <TermPolicyToolbar
            filterName={searchText}
            filterStatus={searchStatus || ''}
            filterType={searchType || ''}
            onFilterName={handleFilterName}
            onFilterStatus={handleFilterStatus}
            onFilterType={handleFilterType}
          />

          <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
            {!!selectedIds.length && (
              <TableSelectedActions
                dense={dense}
                isSelectAll={isCheckedAll}
                numSelected={selectedIds.length}
                rowCount={termPolicyList.length}
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
            <Table sx={{ minWidth: 750 }} size={dense ? 'small' : 'medium'}>
              <TableHeadCustom headLabel={HEAD_LABELS} rowCount={termPolicyList.length} />
              <TableBody>
                {termPolicyList.map((item) => (
                  <TermPolicyTableRow
                    key={item.id}
                    row={item}
                    selected={selectedIds.includes(item.id)}
                    onSelectRow={(checked) => handleSelectItem(item.id, checked)}
                    onEditRow={() => {
                      navigate(PATH_DASHBOARD.termPolicy.edit(item?.id));
                    }}
                    onViewRow={() => {
                      navigate(PATH_DASHBOARD.termPolicy.view(item.id));
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
        </Paper>
      </Container>
    </Page>
  );
}
