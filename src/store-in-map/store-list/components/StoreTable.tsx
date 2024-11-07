import {
  Box,
  FormControlLabel,
  Switch,
  TablePagination,
  Paper,
  TableContainer,
  Table,
  TableBody,
  Tooltip,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Iconify from '../../../common/components/Iconify';
import {
  TableHeadCustom,
  TableNoData,
  TableSelectedActions,
} from '../../../common/components/table';
import useMessage from '../../../common/hooks/useMessage';
import { useSelectMultiple } from '../../../common/hooks/useSelectMultiple';
import useTable from '../../../common/hooks/useTable';
import en from '../../../common/locales/en';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import { replacePathParams } from '../../../common/utils/replaceParams';
import { HEAD_TABLE_PROPS } from '../constant';
import { useDeleteMultiStore } from '../hooks/useDeleteMultiStore';
import { useGetListStore } from '../hooks/useGetListStore';
import { IParams } from '../interface';
import { dispatch, useSelector } from '../../../common/redux/store';
import {
  closeConfirmModal,
  setConfirmModal,
  setIsOpenPopupDelete,
  setSearchParams,
} from '../storeInMap.slice';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ConfirmModal } from '../../../common/components/modal/ConfirmModal';
import StoreTableRow from './StoreTableRow';
import lodash from 'lodash';
import StoreFilter from './StoreFilter';
export default function StoreTable() {
  const { dense, page, setPage, rowsPerPage, onChangePage, onChangeRowsPerPage } =
    useTable();
  const { t } = useTranslation();
  const { confirmModal, searchForm, isOpenPopupDelete } = useSelector(
    (state) => state.storeInMap
  );

  const searchParams: IParams = {
    page: page + 1,
    limit: rowsPerPage,
    searchText: searchForm === '' ? null : searchForm,
  };

  const { data, isLoading } = useGetListStore(searchParams);
  const storeList = data?.items || [];
  useEffect(() => {
    dispatch(setSearchParams(searchParams));
  }, []);

  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const { mutate, isSuccess } = useDeleteMultiStore(
    {
      onSuccess: () => showSuccessSnackbar(t('storeInMap.list.successBar')),
      onError: () => showErrorSnackbar(t('storeInMap.list.errorBar')),
    },
    searchParams
  );
  const handleCloseDeleteModal = () => {
    dispatch(closeConfirmModal());
  };
  const navigate = useNavigate();
  const {
    isCheckedAll,
    reset: resetSelect,
    selectedIds,
    handleSelectItem,
    handleCheckAll,
  } = useSelectMultiple(storeList.map((v) => v.id) || [], page + 1);

  useEffect(() => {
    if (isSuccess) resetSelect();
  }, [isSuccess]);
  const handleDeleteMulti = (ids: number[]) => {
    dispatch(
      setConfirmModal({
        isOpen: true,
        text: t('survey.action.delete.root'),
        callback: () => {
          mutate({ ids: ids });
        },
      })
    );
  };

  const handleEditRow = (idStore: number) => {
    navigate(replacePathParams(PATH_DASHBOARD.storeInMap.edit, { id: idStore }));
  };

  const isNotFound = !storeList.length;
  const totalItems = data?.meta.totalItems || 0;

  return (
    <Paper elevation={3} sx={{ paddingTop: 3 }}>
      <StoreFilter onSetPage={setPage} />
      {isOpenPopupDelete && (
        <ConfirmModal
          isOpen={confirmModal.isOpen}
          onClose={handleCloseDeleteModal}
          onSubmit={confirmModal.callback}
          type={'delete'}
          text={confirmModal.text}
        />
      )}
      <TableContainer sx={{ position: 'relative' }}>
        {!!selectedIds.length && (
          <TableSelectedActions
            dense={dense}
            isSelectAll={isCheckedAll}
            numSelected={selectedIds.length}
            rowCount={storeList.length}
            onSelectAllRows={handleCheckAll}
            actions={
              <Tooltip title="Delete">
                <IconButton
                  color="primary"
                  onClick={() => {
                    dispatch(setIsOpenPopupDelete(true));
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
            headLabel={HEAD_TABLE_PROPS}
            rowCount={storeList.length}
            numSelected={selectedIds.length}
            onSelectAllRows={handleCheckAll}
          />
          <TableBody>
            {storeList.map((row) => (
              <StoreTableRow
                key={row.id}
                row={row}
                selected={selectedIds.includes(row.id)}
                onSelectRow={(e) => {
                  handleSelectItem(row.id, e);
                }}
                onDeleteRow={() => handleDeleteMulti([row?.id])}
                onEditRow={() => {
                  handleEditRow(row.id);
                }}
              />
            ))}
            {/* {isLoading && (
              <GameTableSkeleton isLoading={isLoading} row={rowsPerPage} />
            )} */}

            <TableNoData isNotFound={!isLoading && !storeList?.length} />
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
      </Box>
    </Paper>
  );
}
