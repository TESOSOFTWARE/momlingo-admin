import {
  Box,
  FormControlLabel,
  Paper,
  Switch,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  IconButton,
  Tooltip,
} from '@mui/material';
import lodash from 'lodash';
import {
  TableHeadCustom,
  TableNoData,
  TableSelectedActions,
} from 'src/common/components/table';
import useDeepEffect from 'src/common/hooks/useDeepEffect';
import { useEffect } from 'react';
import useTable from '../../../common/hooks/useTable';
import { TABLE_HEAD } from '../../constants';
import { useGetListGame } from '../hooks/useGetListGame';
import { IListGameParams, IGameList } from '../../interface';

import { PATH_DASHBOARD } from '../../../common/routes/paths';
import { useSelectMultiple } from '../../../common/hooks/useSelectMultiple';
import { dispatch, useSelector } from '../../../common/redux/store';
import { useLocation, useNavigate } from 'react-router-dom';
import Iconify from '../../../common/components/Iconify';
import { useTranslation } from 'react-i18next';
import { ConfirmModal } from '../../../common/components/modal/ConfirmModal';
import { closeConfirmModal, setConfirmModal } from '../../slice';
import { useDeleteById } from '../hooks/useDeleteById';
import GameTableRow from './GameTableRow';
import GameTableSkeleton from './GameTableSkeleton';
import GameFilter from './GameFilter';
import LoadingTableSkeleton from '../../../common/components/LoadingTableSkeleton';

export default function GameTableForm() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { confirmModal, searchForm } = useSelector((state) => state.tierRank);
  const handleCloseDeleteModal = () => {
    dispatch(closeConfirmModal());
  };
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

  const searchParams: IListGameParams = {
    page: page + 1,
    limit: rowsPerPage,
    searchText: searchForm === '' ? undefined : searchForm,
  };
  const { data, isLoading } = useGetListGame(searchParams);

  const listGame = data?.items || [];
  const totalItems = data?.meta?.totalItems || 0;
  const {
    isCheckedAll,
    reset: resetSelect,
    selectedIds,
    setSelectedIds,
    handleSelectItem,
    handleCheckAll,
  } = useSelectMultiple(
    listGame.map((item) => item.id),
    page + 1
  );
  const { mutate: deleteGameById, isSuccess } = useDeleteById({
    page: page + 1,
    limit: rowsPerPage,
  });
  useEffect(() => {
    if (isSuccess) resetSelect();
  }, [isSuccess]);
  const handleEditRow = (id: number) => {
    navigate(PATH_DASHBOARD.gameManage.edit(id.toString()));
  };
  const handleDeleteMulti = (ids: number[]) => {
    dispatch(
      setConfirmModal({
        isOpen: true,
        text: t('survey.action.delete.root'),
        callback: () => {
          ids.map((id) => {
            deleteGameById(id);
          });
        },
      })
    );
  };
  const handleDeleteSingle = (game: IGameList) => {
    dispatch(
      setConfirmModal({
        isOpen: true,
        text: t('survey.action.delete.root'),
        callback: () => {
          setSelectedIds(selectedIds.filter((index) => index !== game.id));
          deleteGameById(game.id);
        },
      })
    );
  };
  return (
    <Paper elevation={3} sx={{ paddingTop: 3 }}>
      <GameFilter onSetPage={setPage} />
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={handleCloseDeleteModal}
        onSubmit={confirmModal.callback}
        type={'delete'}
        text={confirmModal.text}
      />
      <TableContainer sx={{ position: 'relative' }}>
        {!!selectedIds.length && (
          <TableSelectedActions
            dense={dense}
            isSelectAll={isCheckedAll}
            numSelected={selectedIds.length}
            rowCount={listGame.length}
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
            headLabel={TABLE_HEAD}
            rowCount={listGame.length}
            numSelected={selectedIds.length}
            onSelectAllRows={handleCheckAll}
          />
          <TableBody>
            {listGame.map((row) => (
              <GameTableRow
                key={row.id}
                row={row}
                selected={selectedIds.includes(row.id)}
                onSelectRow={(e) => {
                  handleSelectItem(row.id, e);
                }}
                onDeleteRow={() => handleDeleteSingle(row)}
                onEditRow={() => {
                  handleEditRow(row.id);
                }}
              />
            ))}
            {isLoading && (
              <LoadingTableSkeleton column={TABLE_HEAD.length + 1} row={rowsPerPage} />
            )}

            <TableNoData isNotFound={!isLoading && !listGame?.length} />
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
