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
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import HeaderBreadcrumbs from '../../common/components/HeaderBreadcrumbs';
import Page from '../../common/components/Page';
import {
  TableHeadCustom,
  TableNoData,
  TableSkeleton,
} from '../../common/components/table';
import { BREADCUMBS } from '../../common/constants/common.constants';
import useSettings from '../../common/hooks/useSettings';
import useTable from '../../common/hooks/useTable';
import { PATH_DASHBOARD } from '../../common/routes/paths';
import GiftTableRow from './components/GiftTableRow';
import { HEAD_LABELS } from '../common/constant';
import { useGetGift } from './hooks/useGetGift';
import { useSelector, dispatch } from '../../common/redux/store';
import { ConfirmModal } from '../../common/components/modal/ConfirmModal';
import { closeConfirmModal, setConfirmModal } from '../common/gift.slice';
import { IGiftData, ISearchParams } from '../common/interface';
import { isTemplateLiteral } from 'typescript';
import { useDeleteSingleGift } from './hooks/useDeleteSingleGift';
import TableToolbar from './components/TableToolbar';
import useDebounce from '../../winning-history/hooks/useDebounce';

export default function GiftList() {
  const { confirmModal, searchText, searchType } = useSelector((state) => state.gift);
  const { t } = useTranslation();
  const { themeStretch } = useSettings();

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
    searchParams.searchType = searchType;
  } else {
    delete searchParams.searchText;
    delete searchParams.searchType;
  }

  const { data, isLoading, isError } = useGetGift({
    ...searchParams,
  });

  const giftList = data?.items || [];
  const isNotFound = (!isLoading && !giftList.length) || isError;
  const totalItems = data?.meta.totalItems || 0;

  const { mutate: deleteSingleGift } = useDeleteSingleGift({
    page: page + 1,
    limit: rowsPerPage,
  });

  const handleCloseDeleteModal = () => {
    dispatch(closeConfirmModal());
  };

  const handleDeleteSingle = (gift: IGiftData) => {
    dispatch(
      setConfirmModal({
        isOpen: true,
        text: t('confirmDeleteSigGift', { giftName: gift.name }),
        callback: () => {
          deleteSingleGift(gift.id);
        },
      })
    );
  };

  return (
    <Page title={t('giftList')}>
      <Container maxWidth={themeStretch ? 'sm' : 'xl'}>
        <HeaderBreadcrumbs
          heading={t('giftList')}
          links={[
            { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
            { name: t('giftList') },
          ]}
        />

        <Paper elevation={3} sx={{ paddingTop: '10px' }}>
          <ConfirmModal
            isOpen={confirmModal.isOpen}
            onClose={handleCloseDeleteModal}
            onSubmit={confirmModal.callback}
            text={confirmModal.text}
            type="delete"
          />

          <TableToolbar setPage={setPage} />

          <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
            <Table sx={{ minWidth: 750 }} size={dense ? 'small' : 'medium'}>
              <TableHeadCustom headLabel={HEAD_LABELS} rowCount={giftList.length} />
              <TableBody>
                {giftList.map((item) => (
                  <GiftTableRow
                    key={item.id}
                    row={item}
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
