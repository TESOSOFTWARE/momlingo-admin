import {
  Container,
  Card,
  TableContainer,
  Table,
  TableBody,
  TablePagination,
  FormControlLabel,
  Switch,
  Box,
  Button,
} from '@mui/material';
import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import Page from 'src/common/components/Page';
import { TableHeadCustom, TableNoData } from 'src/common/components/table';
import { BREADCUMBS } from 'src/common/constants/common.constants';
import useSettings from 'src/common/hooks/useSettings';
import useTable from 'src/common/hooks/useTable';
import { PATH_DASHBOARD } from 'src/common/routes/paths';

import ListQRTableRow from './ListQRTableRow';
import TableToolbar from './TableToolBar';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { dispatch, useSelector } from 'src/common/redux/store';
import TableSkeleton from './TableSkeleton';
import ExportModal from './ExportModal';
import { useEffect, useState } from 'react';
import ChangeStatusModal from './ChangeStatusModal';
import useMessage from 'src/common/hooks/useMessage';
import {
  setClearFilterSearch,
  setModalChangeStatus,
  setQrSelected,
} from '../qrCode.slice';
import { IParamsChangeStatus, IResListQRCode } from '../../interfaces';
import { TABLE_HEAD } from '../../constants';
import { useGetListQRCode } from '../../hooks/useGetListQRCode';
import useChangeStatusQRCode from '../../hooks/useChangeStatusQRCode';

export default function ListQRCodeDashboard() {
  const [openModal, setOpenModal] = useState(false);
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const { themeStretch } = useSettings();
  const {
    dense,
    page,
    rowsPerPage,
    setPage,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const stateRedux = useSelector((state) => state.qrCode);
  const { data, isLoading } = useGetListQRCode({
    page: page + 1,
    limit: rowsPerPage,
    searchText: stateRedux.textSearch,
    startDate: stateRedux.startDate,
    endDate: stateRedux.endDate,
  });
  const listQRCode = data?.items || [];
  const totalItem = data?.total || 0;

  const params: IParamsChangeStatus = {
    ids: [stateRedux.qrSelected],
    isActive: stateRedux.valueChange,
  };

  const { mutate } = useChangeStatusQRCode({
    onSuccess: () => {
      showSuccessSnackbar('Change Status Successfully');
    },
    onError: () => {
      showErrorSnackbar('Change Status fail');
    },
  });

  const handleChangeStatus = () => {
    mutate(params);
    dispatch(setModalChangeStatus(false));
    dispatch(setQrSelected(-1));
  };

  useEffect(() => {
    dispatch(setClearFilterSearch());
  }, []);

  return (
    <>
      <Card>
        <TableToolbar setPage={setPage} />
        <TableContainer
          sx={{
            minWidth: 800,
            position: 'relative',
          }}
        >
          <Table size={dense ? 'small' : 'medium'}>
            <TableHeadCustom headLabel={TABLE_HEAD} rowCount={listQRCode.length} />

            <TableBody>
              {!isLoading &&
                listQRCode?.map((item: IResListQRCode, index: number) => (
                  <ListQRTableRow key={index} data={item} />
                ))}
              {isLoading && <TableSkeleton isLoading={isLoading} row={rowsPerPage} />}

              <TableNoData isNotFound={!isLoading && !listQRCode?.length} />
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ position: 'relative' }}>
          <TablePagination
            rowsPerPageOptions={[1, 5, 10, 25]}
            component="div"
            count={totalItem}
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
      </Card>
      <ChangeStatusModal handleChangeStatus={handleChangeStatus} />
    </>
  );
}
