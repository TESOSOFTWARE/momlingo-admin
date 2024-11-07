import { LoadingButton } from '@mui/lab';
import { Button, Card, Stack } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import {
  FormProvider,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
} from '../../../common/components/hook-form';
import Iconify from '../../../common/components/Iconify';
import useDeepEffect from '../../../common/hooks/useDeepEffect';
import useMessage from '../../../common/hooks/useMessage';
import vn from '../../../common/locales/vn';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import { TypePoint } from '../constant';
import { useEditPoint } from '../hooks/useEditPoint';
import { useGetPointById } from '../hooks/useGetPointById';
import { IDetailPoint, IEditPoint } from '../interface';

export default function EditPointForm() {
  const methods = useForm<IDetailPoint>();
  const { handleSubmit, reset } = methods;
  const navigate = useNavigate();
  const params = useParams();
  const idDetail = params?.id as unknown as number;
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const { data: detailPoint } = useGetPointById({
    id: idDetail,
    callback: {
      onSuccess: () => {},
      onError: () => showErrorSnackbar('Loi'),
    },
  });

  const { useDeepCompareEffect } = useDeepEffect();
  useDeepCompareEffect(() => {
    if (detailPoint) {
      reset({
        createdAt: detailPoint.createdAt,
        id: detailPoint.id,
        code: detailPoint.code,
        point: detailPoint.point,
        type: detailPoint.type,
        description: detailPoint.description,
        isActive: detailPoint.isActive,
        productGroup: detailPoint.productGroup,
        weight: detailPoint.weight,
      });
    }
  }, [detailPoint]);

  const { mutate } = useEditPoint({
    onSuccess: () => {
      showSuccessSnackbar('Chinh sua thanh cong');
      navigate(PATH_DASHBOARD.point.list);
    },
    onError: () => showErrorSnackbar('Chinh sua that bai'),
  });

  const onSubmit = (data: IDetailPoint) => {
    const editData: IEditPoint = {
      code: data.code,
      point: data.point,
      type: data.type,
      description: data.description,
      isActive: data.isActive,
      productGroup: data.productGroup,
      weight: data.weight,
    };
    mutate({ data: editData, id: idDetail });
  };

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Card sx={{ padding: 3 }}>
          <Stack spacing={3}>
            <RHFTextField
              name="createdAt"
              label="Ngày tạo"
              size="small"
              InputLabelProps={{ shrink: true }}
              disabled
            />
            <RHFTextField
              name="id"
              label="Id"
              size="small"
              InputLabelProps={{ shrink: true }}
              disabled
            />
            <RHFTextField
              name="code"
              label="Mã"
              size="small"
              InputLabelProps={{ shrink: true }}
            />
            <RHFTextField
              name="point"
              label="Điểm"
              size="small"
              InputLabelProps={{ shrink: true }}
            />
            <RHFSelect name="type" label="Kiểu" size="small">
              {TypePoint.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </RHFSelect>
            <RHFTextField
              name="description"
              label="Mô tả"
              size="small"
              InputLabelProps={{ shrink: true }}
            />
            <RHFTextField
              name="productGroup"
              label="Nhóm sản phẩm"
              size="small"
              InputLabelProps={{ shrink: true }}
              disabled={detailPoint?.type === 'SBPS' ? true : false}
            />
            <RHFTextField
              name="weight"
              label="Trọng lượng"
              size="small"
              InputLabelProps={{ shrink: true }}
              disabled={detailPoint?.type === 'SBPS' ? true : false}
            />
            <RHFSwitch name="isActive" label="Trạng thái hoạt động" />
          </Stack>
        </Card>
        <Stack
          direction="row"
          display="flex"
          justifyContent="flex-end"
          spacing={3}
          sx={{ marginTop: 3 }}
        >
          <LoadingButton
            variant="contained"
            startIcon={<Iconify icon="mdi:content-save-all-outline" />}
            type="submit"
            // loading={isLoading}
          >
            {vn.saveChange}
          </LoadingButton>
          <Button
            onClick={() => navigate(PATH_DASHBOARD.point.list)}
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="material-symbols:cancel-outline-rounded" />}
          >
            {vn.cancel}
          </Button>
        </Stack>
      </FormProvider>
    </>
  );
}
