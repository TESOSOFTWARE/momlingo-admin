import { Button, Container, Paper, Stack, FormLabel } from '@mui/material';
import { useTranslation } from 'react-i18next';
import HeaderBreadcrumbs from '../../common/components/HeaderBreadcrumbs';
import { LabelStyle } from '../../config-home/components/banners-section/BannerConfig';
import {
  FormProvider,
  RHFEditor,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFUploadSingleFile,
} from '../../common/components/hook-form';
import Page from '../../common/components/Page';
import { BREADCUMBS } from '../../common/constants/common.constants';
import useSettings from '../../common/hooks/useSettings';
import { PATH_DASHBOARD } from '../../common/routes/paths';
import { fData } from '../../common/utils/formatNumber';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { usePresignImg } from '../../common/hooks/usePresignImg';
import { useCallback, useEffect } from 'react';
import useMessage from '../../common/hooks/useMessage';
import { LoadingButton } from '@mui/lab';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetTierRankById } from './hooks/useGetTierRankById';
import { useEditTierRank } from './hooks/useEditTierRank';
import vn from '../../common/locales/vn';
import { ITierRankForm, ITierRankList } from '../interface';
import { schemaTierRank } from '../schema';
import { nextCodeTierRank, TYPE_CODE } from '../constants';
import { useGetListTierRank } from '../tier-rank-list/hooks/useGetListTierRank';

export default function TierRankEdit() {
  const { t } = useTranslation();
  const { themeStretch } = useSettings();
  const navigate = useNavigate();
  const { handleUpload } = usePresignImg();
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const { data: dataList, isLoading } = useGetListTierRank({ limit: 100 });

  const methods = useForm<ITierRankForm>({
    resolver: yupResolver(schemaTierRank(dataList)),
    defaultValues: {
      name: '',
      description: '',
      isActive: false,
      maxPoint: 0,
      nextTierCode: '',
      code: '',
      poinNextTierCode: '',
      descriptionMember: '',
    },
  });

  const {
    reset,
    setValue,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = methods;
  const getImageInfo = async (file: File): Promise<{ id: number; url: string }> => {
    const imgInfo = await handleUpload(file);
    return imgInfo;
  };

  const { id } = useParams();
  const { data: dataTierRank } = useGetTierRankById(parseInt(id as string));
  useEffect(() => {
    if (dataTierRank) reset(dataTierRank);
  }, [dataTierRank]);
  const { mutate, isSuccess } = useEditTierRank({
    onSuccess: () => {
      showSuccessSnackbar(t('tierRankManage.edit.success'));
      navigate(PATH_DASHBOARD.tierRankManage.list);
    },
    onError: () => showErrorSnackbar(t('tierRankManage.edit.fail')),
  });

  useEffect(() => {
    const test = dataList?.items.find((item: any) => {
      return item?.name.toUpperCase() === watch('nextTierCode');
    });
    setValue('poinNextTierCode', test ? test?.conditionPoint.toString() : 'Không có');
  }, [dataList, watch('nextTierCode')]);
  useEffect(() => {
    setValue('nextTierCode', nextCodeTierRank[watch()?.code]);
  }, [watch()]);
  useEffect(() => {
    if (isSuccess) {
      navigate(PATH_DASHBOARD.tierRankManage.list);
    }
  }, [isSuccess]);
  const onSubmit = async (data: ITierRankForm) => {
    const dataEdit = {
      ...data,
      nextTierCode:
        data?.nextTierCode === nextCodeTierRank['PLATINUM'] ? null : data?.nextTierCode,
      conditionPoint: parseInt(data.conditionPoint.toString()),
      maxPoint: parseInt(data.maxPoint.toString()),
    };
    delete dataEdit?.poinNextTierCode;
    mutate({ data: dataEdit, id: parseInt(id as string) });
  };
  const handleCancle = () => {
    navigate(PATH_DASHBOARD.tierRankManage.list);
  };
  return (
    <Page title={t('tierRankManage.edit.title')}>
      <Container maxWidth={themeStretch ? 'sm' : 'xl'}>
        <HeaderBreadcrumbs
          heading={t('tierRankManage.edit.title')}
          links={[
            { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
            {
              name: t('tierRankManage.list.title'),
              href: PATH_DASHBOARD.tierRankManage.list,
            },
            {
              name: t('tierRankManage.edit.title'),
              href: PATH_DASHBOARD.tierRankManage.create,
            },
          ]}
        />
        <Paper elevation={5} sx={{ p: 3 }}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3} direction="column">
              <RHFTextField name="name" label="Tên" />
              <RHFTextField name="description" label="Mô tả" />
              <Stack spacing={1}>
                <Stack
                  direction="row"
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <FormLabel sx={{ marginLeft: '14px' }}>Mô tả thành viên</FormLabel>
                </Stack>
                <RHFEditor name="descriptionMember" />
              </Stack>
              <RHFSwitch name="isActive" label="Trạng thái" />
              <RHFTextField
                name="conditionPoint"
                type="number"
                InputLabelProps={{ shrink: true }}
                label="Điều kiện đạt thứ hạng"
              />
              <RHFTextField
                name="maxPoint"
                type="number"
                label="Điểm tối đa của thứ hạng"
              />
              <RHFSelect name="code" disabled label="Thứ hạng">
                {TYPE_CODE.map((item) => {
                  return (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  );
                })}
              </RHFSelect>
              <RHFTextField disabled name="nextTierCode" label="Thứ hạng tiếp theo" />
              <RHFTextField
                disabled
                name="poinNextTierCode"
                label="Điều kiện đạt của thứ hạng tiếp theo"
              />
            </Stack>
            <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
              <Button
                color="inherit"
                size="medium"
                variant="contained"
                onClick={handleCancle}
              >
                {t('cancel')}
              </Button>
              <LoadingButton
                size="large"
                variant="contained"
                loading={isSubmitting}
                type="submit"
              >
                {t('Save')}
              </LoadingButton>
            </Stack>
          </FormProvider>
        </Paper>
      </Container>
    </Page>
  );
}
