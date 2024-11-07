import { LoadingButton } from '@mui/lab';
import { Box, Table, TableBody, TablePagination, Paper, Stack } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { FormProvider, RHFTextField } from 'src/common/components/hook-form';
import useDeepEffect from 'src/common/hooks/useDeepEffect';
import useMessage from 'src/common/hooks/useMessage';
import { dispatch } from 'src/common/redux/store';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { formatDay_DMY } from 'src/request-management/request-common/FormatDate';
import { renderFactoryName } from 'src/request-management/request-common/renderFactoryName';
import {
  renderApprovedDate,
  renderHaveORNo,
  renderRejectDes,
} from 'src/request-management/request-common/renderNull';
import { renderSku } from 'src/request-management/request-common/renderSku';
import {
  renderActive,
  renderStatus,
} from 'src/request-management/request-common/renderStatus';
import ExportPopup from 'src/request-management/request-list/components/ExportPopup';
import {
  setExportPopup,
  setFileId,
  setNameFile,
} from 'src/request-management/request-list/list-slice';
import { TableHeadCustom, TableNoData } from '../../../common/components/table';
import useTable from '../../../common/hooks/useTable';
import axiosInstance from '../../../common/utils/axios';
import {
  HEAD_TABLE_PROPS,
  HEAD_TABLE_PROPS_APPROVE_USER,
} from '../../request-list/list-constants';
import { useGetRequestById } from '../hooks/useGetRequestById';
import { usePostApprove } from '../hooks/usePostApprove';
import { IStatus } from '../interface';
import { setIsSetPassword, setPopup } from '../../requestManage.slice';
import RejectModalPopup from './RejectModalPopup';
import RequestDetailHeader from './RequestDetailHeader';
import SetPassWordModal from './SetPassWordModal';
import Can from '../../../common/lib/Can';
import { useTranslation } from 'react-i18next';
import { Action, Resource } from '../../../common/constants/common.interfaces';
import { fDateTime24h } from '../../../common/utils/formatTime';

export default function RequestDetailForm() {
  const params = useParams();
  const { t } = useTranslation();
  const idFile = params?.fileId as unknown as number;
  const navigate = useNavigate();
  const {
    dense,
    page,
    rowsPerPage,
    setPage,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();
  const { useDeepCompareEffect } = useDeepEffect();

  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const { data } = useGetRequestById({
    fileId: idFile,
    callback: {
      onSuccess: () => {},
      onError: () => showErrorSnackbar('Lấy thông tin request thất bại'),
    },
  });
  const requestDetail = data;

  const methods = useForm();
  const { reset } = methods;
  console.log(requestDetail);
  useDeepCompareEffect(() => {
    if (requestDetail) {
      reset({
        id: requestDetail.id,
        name: requestDetail.name,
        approvedDate:
          requestDetail.approvedDate === null
            ? ''
            : fDateTime24h(requestDetail.approvedDate),
        codeQuantity: requestDetail.addPointCodeQuantity,
        status: renderStatus(requestDetail.status),
        codeQuantityCreated: renderHaveORNo(requestDetail.addPointCodeQuantityCreated),
        rejectDescription: renderRejectDes(requestDetail.rejectDescription),
        factory: requestDetail.factory,
        type: requestDetail.type,
        description: requestDetail.description,
        sku: renderSku(requestDetail.sku),
        weight: requestDetail.weight,
        manufactureDate: fDateTime24h(requestDetail.manufactureDate),
        isActive: renderActive(requestDetail.isActive),
        nameUserRequest: requestDetail.nameUserRequest,
        accApproveId: requestDetail.userApproveId,
        createdAt: fDateTime24h(requestDetail.createdAt),
        updatedAt: requestDetail.updatedAt,
        userApprove: renderHaveORNo(requestDetail?.userApprove?.merchant?.email),
      });
    }
  }, [requestDetail]);
  const { mutate } = usePostApprove(
    {
      onSuccess: () => showSuccessSnackbar('Duyệt file thành công'),
      onError: () => showErrorSnackbar('Duyệt file thất bại'),
    },
    idFile
  );

  const handleApproveFile = () => {
    mutate(idFile);
  };
  const onExport = async (id: number, name: string) => {
    dispatch(setFileId(id));
    dispatch(setNameFile(name));
    dispatch(setExportPopup(true));
  };
  const handleRejectFile = () => {
    dispatch(setPopup(true));
  };

  return (
    <FormProvider methods={methods}>
      <SetPassWordModal fileId={idFile} />
      <RejectModalPopup fileId={idFile} />
      <RequestDetailHeader
        handleClickExport={() => {
          if (requestDetail !== undefined) {
            onExport(requestDetail.id || 0, requestDetail?.name);
          }
        }}
        showButton={requestDetail?.status || IStatus.NOT_APPROVE}
      />
      <ExportPopup />
      <Paper elevation={3} sx={{ padding: '30px' }}>
        <Stack spacing={3}>
          <RHFTextField
            name="name"
            label="Tên File"
            size="small"
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
            InputLabelProps={{ shrink: true }}
            disabled
          />
          <RHFTextField
            name="userApprove"
            label="Người duyệt File"
            size="small"
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
            InputLabelProps={{ shrink: true }}
            disabled
          />
          <Stack direction="row" spacing={3}>
            <RHFTextField
              name="id"
              label="File ID"
              size="small"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
              InputLabelProps={{ shrink: true }}
              disabled
            />
            <RHFTextField
              name="status"
              label="Trạng thái"
              size="small"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
              InputLabelProps={{ shrink: true }}
              disabled
            />
          </Stack>

          <Stack direction="row" spacing={3}>
            <RHFTextField
              name="type"
              label="Kiểu sản phẩm"
              size="small"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
              InputLabelProps={{ shrink: true }}
              disabled
            />
            <RHFTextField
              name="weight"
              label="Khối lượng"
              size="small"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
              InputLabelProps={{ shrink: true }}
              disabled
            />
          </Stack>

          <Stack direction="row" spacing={3}>
            <RHFTextField
              name="codeQuantity"
              label="Số lượng code"
              size="small"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
              InputLabelProps={{ shrink: true }}
              disabled
            />
            <RHFTextField
              name="codeQuantityCreated"
              label="Số lượng code đã tạo"
              size="small"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
              InputLabelProps={{ shrink: true }}
              disabled
            />
          </Stack>

          <Stack direction="row" spacing={3}>
            <RHFTextField
              name="isActive"
              label="Trạng thái hoạt động"
              size="small"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
              InputLabelProps={{ shrink: true }}
              disabled
            />

            <RHFTextField
              name="approvedDate"
              label="Ngày áp dụng mã QR"
              size="small"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
              InputLabelProps={{ shrink: true }}
              disabled
            />
          </Stack>

          <Stack direction="row" spacing={3}>
            <RHFTextField
              name="createdAt"
              label="Ngày tạo mã QR"
              size="small"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
              InputLabelProps={{ shrink: true }}
              disabled
            />

            <RHFTextField
              name="rejectDescription"
              label="Mô tả từ chối duyệt file"
              size="small"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
              InputLabelProps={{ shrink: true }}
              disabled
            />
          </Stack>
        </Stack>
      </Paper>

      {requestDetail?.status === IStatus.NOT_APPROVE && (
        <Can do={Action.UPDATE} on={Resource.FILE_REQUEST}>
          <Stack
            direction="row"
            spacing={3}
            sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 3 }}
          >
            <LoadingButton variant="contained" onClick={handleApproveFile}>
              {t('requestManagement.acceptFile')}
            </LoadingButton>
            <LoadingButton variant="contained" color="error" onClick={handleRejectFile}>
              {t('requestManagement.denyFile')}
            </LoadingButton>
          </Stack>
        </Can>
      )}
    </FormProvider>
  );
}
