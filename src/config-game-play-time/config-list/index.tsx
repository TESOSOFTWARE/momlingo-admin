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
import ConfigPlayTimeTableRow from './components/ConfigPlayTimeTableRow';
import { HEAD_LABELS } from '../common/constant';
import { useSelector, dispatch } from '../../common/redux/store';
import { ConfirmModal } from '../../common/components/modal/ConfirmModal';
import {
  closeConfirmModal,
  setConfirmModal,
  setSearchGameId,
  setSearchText,
} from '../common/slice';
import { IGamePlayTime, IParamsSearch } from '../common/interface';
import { useDeleteSingleGamePlayTime } from './hooks/useDeleteSingleGamePlaytime';
import ConfigPlayTimeToolbar from './components/ConfigPlayTimeFilter';
import useDebounce from 'src/winning-history/hooks/useDebounce';
import ConfigPlayTimeHeader from './components/ConfigPlayTimeHeader';
import { useSelectMultiple } from 'src/common/hooks/useSelectMultiple';
import { useNavigate } from 'react-router-dom';
import { replacePathParams } from 'src/common/utils/replaceParams';
import { useDeleteMultipleGamePlaytime } from './hooks/useDeleteMultipleGamePlaytime';
import { PATH_DASHBOARD } from '../../common/routes/paths';
import { useGetListGamePlaytime } from './hooks/useGetListGamePlayTime';

export default function GroupPolicyList() {
  const { confirmModal, searchText, searchGameId } = useSelector(
    (state) => state.configPlayTime
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

  const searchParams: IParamsSearch = {
    page: page + 1,
    limit: rowsPerPage,
  };

  const debouncedSearchText = useDebounce<string>(searchText, 500);

  const debouncedSearchGameId = useDebounce<number | undefined>(searchGameId, 500);

  if (debouncedSearchText.length > 2) {
    searchParams.searchText = debouncedSearchText;
  }
  if (debouncedSearchGameId) {
    searchParams.gameId = searchGameId;
  }

  const handleFilterName = (value: string) => {
    dispatch(setSearchText(value));
    setPage(0);
  };

  const handleFilterGameId = (value: number) => {
    dispatch(setSearchGameId(value));
    setPage(0);
  };

  const { data, isLoading, isError } = useGetListGamePlaytime({
    ...searchParams,
  });

  const gamePlayTimeList = data?.items || [];
  const isNotFound = (!isLoading && !gamePlayTimeList.length) || isError;
  const totalItems = data?.meta.totalItems || 0;

  const { mutate: deleteSingleConfig } = useDeleteSingleGamePlayTime();

  const { mutateAsync: deleteMultipleConfig } = useDeleteMultipleGamePlaytime();
  const {
    isCheckedAll,
    reset: resetSelect,
    selectedIds,
    handleSelectItem,
    handleCheckAll,
    setSelectedIds,
  } = useSelectMultiple(
    gamePlayTimeList.map((item) => item.id),
    page + 1
  );
  const handleCloseDeleteModal = () => {
    dispatch(closeConfirmModal());
  };

  const handleDeleteSingle = (game: IGamePlayTime) => {
    dispatch(
      setConfirmModal({
        isOpen: true,
        text: t('group_policy.list.delete.content', { groupName: game?.game?.name }),
        callback: () => {
          deleteSingleConfig(game?.id);
          setSelectedIds(selectedIds.filter((item) => item !== game.id));
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
          await deleteMultipleConfig(selectedIds);
          resetSelect();
        },
      })
    );
  };
  return (
    <Page title={t('configPlayTime.list.title')}>
      <Container maxWidth={themeStretch ? 'sm' : 'xl'}>
        <ConfigPlayTimeHeader />

        <ConfirmModal
          isOpen={confirmModal.isOpen}
          onClose={handleCloseDeleteModal}
          onSubmit={confirmModal.callback}
          text={confirmModal.text}
          type="delete"
        />

        <Card sx={{ padding: 1 }}>
          <ConfigPlayTimeToolbar
            filterName={searchText}
            filterGameId={undefined}
            onFilterName={handleFilterName}
            onFilterGameId={handleFilterGameId}
          />

          <TableContainer sx={{ position: 'relative' }}>
            {!!selectedIds.length && (
              <TableSelectedActions
                dense={dense}
                isSelectAll={isCheckedAll}
                numSelected={selectedIds.length}
                rowCount={gamePlayTimeList.length}
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
                  rowCount={gamePlayTimeList.length}
                />
                <TableBody>
                  {gamePlayTimeList.map((item) => (
                    <ConfigPlayTimeTableRow
                      key={item.id}
                      row={item}
                      selected={selectedIds.includes(item.id)}
                      onSelectRow={(checked) => handleSelectItem(item.id, checked)}
                      onEditRow={() => {
                        navigate(
                          replacePathParams(PATH_DASHBOARD.configPlayTime.edit, {
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
