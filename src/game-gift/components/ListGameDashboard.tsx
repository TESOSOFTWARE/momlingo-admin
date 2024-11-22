import {
  Box,
  FormControlLabel,
  Paper,
  Switch,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Tooltip,
  IconButton,
  Typography,
} from '@mui/material';
import lodash from 'lodash';
import {
  TableHeadCustom,
  TableNoData,
  TableSelectedActions,
} from 'src/common/components/table';
import useDeepEffect from 'src/common/hooks/useDeepEffect';
import useTable from '../../common/hooks/useTable';
import { useGetListGameGift } from '../hooks/useGetListGameGift';
import Scrollbar from '../../common/components/Scrollbar';
import { useSelectMultiple } from '../../common/hooks/useSelectMultiple';
import { useNavigate, useParams } from 'react-router-dom';
import Iconify from '../../common/components/Iconify';
import { GAME_GIFT_TABLE_HEAD } from '../constants';
import GameGiftTableRow from './GameGiftTableRow';
import LoadingTableSkeleton from '../../common/components/LoadingTableSkeleton';
import { useDeleteGameGift } from '../hooks/useDeleteGameGift';
import useShowSnackbar from '../../common/hooks/useMessage';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  isOpenConfirmModalSelector,
  selectedIdsSelector,
  setIsOpenConfirmModal,
  setSelectedRow,
} from '../gameGift.slice';
import { ConfirmModal } from '../../common/components/modal/ConfirmModal';
import { PATH_DASHBOARD } from '../../common/routes/paths';

export default function ListGameGiftsDashBoard() {
  const { useDeepCompareEffect } = useDeepEffect();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { id: gameId } = useParams();

  const { showSuccessSnackbar, showErrorSnackbar } = useShowSnackbar();
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
  const searchParams = {
    page: page + 1,
    limit: rowsPerPage,
    gameId: parseInt(gameId as string),
  };

  const { data, isLoading } = useGetListGameGift(searchParams);

  const listRequest = data?.items || [];

  // const listRequest = DATA_LIST_USER;
  const totalItems = data?.meta?.totalItems || 0;
  // const totalItems = 0;
  const {
    isCheckedAll,
    reset: resetSelect,
    selectedIds,
    setSelectedIds,
    handleSelectItem,
    handleCheckAll,
  } = useSelectMultiple(
    listRequest.map((item) => item.id),
    page + 1
  );

  const selectedRowRedux = useSelector(selectedIdsSelector);
  const isOpenModal = useSelector(isOpenConfirmModalSelector);

  const { mutate } = useDeleteGameGift({
    onSuccess: () => {
      showSuccessSnackbar(t('gameGifts.deleteSuccess'));
    },
    onError: () => {
      showErrorSnackbar(t('gameGifts.deleteFailed'));
    },
  });
  const handleDeleteMulti = (selectedIds: number[]) => {
    dispatch(setIsOpenConfirmModal(true));
    dispatch(setSelectedRow(selectedIds));
    resetSelect();
  };
  const onDeleteMultiple = () => {
    mutate({ ids: selectedRowRedux });
    dispatch(setSelectedRow([]));
  };
  const handleEditRow = (id: number) => {
    navigate(PATH_DASHBOARD.gameGift.edit(gameId as string, id.toString()));
  };

  const isNotFound = !isLoading && !listRequest.length;

  return (
    <Paper elevation={3} sx={{ paddingTop: 1, boxShadow: 10 }}>
      <ConfirmModal
        isOpen={isOpenModal}
        onClose={() => dispatch(setIsOpenConfirmModal(false))}
        onSubmit={onDeleteMultiple}
        type={'delete'}
        text={t('gameGifts.modal.text')}
      />
      <Scrollbar>
        <TableContainer sx={{ position: 'relative' }}>
          {!!selectedIds.length && (
            <TableSelectedActions
              dense={dense}
              isSelectAll={isCheckedAll}
              numSelected={selectedIds?.length}
              rowCount={listRequest?.length}
              onSelectAllRows={handleCheckAll}
              actions={
                <Tooltip title="Delete">
                  <IconButton
                    color="primary"
                    onClick={() => {
                      handleDeleteMulti(selectedIds);
                    }}
                  >
                    <Iconify icon={'eva:trash-2-outline'} />
                  </IconButton>
                </Tooltip>
              }
            />
          )}

          <Table size={dense ? 'small' : 'medium'}>
            <TableHeadCustom
              isSelectAll={isCheckedAll}
              headLabel={GAME_GIFT_TABLE_HEAD}
              rowCount={listRequest.length}
              numSelected={selectedIds.length}
              onSelectAllRows={handleCheckAll}
            />

            <TableBody>
              {listRequest?.map((row) => (
                <GameGiftTableRow
                  key={row?.id}
                  row={row}
                  selected={selectedIds.includes(row?.id)}
                  onSelectRow={(e) => {
                    handleSelectItem(row?.id, e);
                  }}
                  onDeleteRow={() => handleDeleteMulti([row?.id])}
                  onEditRow={() => {
                    handleEditRow(row?.id);
                  }}
                />
              ))}
              {isLoading && (
                <LoadingTableSkeleton
                  column={GAME_GIFT_TABLE_HEAD.length + 1}
                  row={rowsPerPage}
                />
              )}
              <TableNoData isNotFound={isNotFound} />
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
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
          label="Thu gọn"
          sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
        />
      </Box>
    </Paper>
  );
}
