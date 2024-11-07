import { Button, Container, Paper, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import HeaderBreadcrumbs from '../../common/components/HeaderBreadcrumbs';
import {
  FormProvider,
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
import { schemaTierRank } from '../schema';
import { ITierRankForm } from '../interface';
import { useCreateTierRank } from './hooks/useCreateTierRank';
import { useNavigate } from 'react-router-dom';
import { nextCodeTierRank, TYPE_CODE } from '../constants';
export default function TierRankCreate() {
  const { t } = useTranslation();
  const { themeStretch } = useSettings();
  const navigate = useNavigate();
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const { handleUpload } = usePresignImg();

  const methods = useForm<ITierRankForm>({
    // resolver: yupResolver(schemaTierRank),
    defaultValues: {
      name: '',
      description: '',
      isActive: false,
      conditionPoint: 0,
      maxPoint: 0,
      nextTierCode: '',
      code: '',
    },
  });
  const { mutate, isSuccess } = useCreateTierRank({
    onSuccess: () => {
      showSuccessSnackbar(t('tierRankManage.create.success'));
    },
    onError: () => {
      showErrorSnackbar(t('tierRankManage.create.fail'));
    },
  });
  const {
    reset,
    setValue,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = methods;
  useEffect(() => {
    if (isSuccess) {
      navigate(PATH_DASHBOARD.tierRankManage.list);
    }
  }, [isSuccess]);
  // const handleDrop = useCallback(
  //     (acceptedFiles: File[]) => {
  //         const file = acceptedFiles[0];
  //         if (file) {
  //             setValue(
  //                 'image',
  //                 Object.assign(file, {
  //                     preview: URL.createObjectURL(file),
  //                 })
  //             );
  //         }
  //     },
  //     [setValue]
  // );

  const handleCancle = () => {
    navigate(PATH_DASHBOARD.tierRankManage.list);
  };

  const onSubmit = async (data: ITierRankForm) => {
    // const file = await handleUpload(data?.image as File);
    // console.log(data)
    const dataCreate = {
      ...data,
      conditionPoint: parseInt(data.conditionPoint.toString()),
      maxPoint: parseInt(data.maxPoint.toString()),
    };
    mutate(dataCreate);
  };
  useEffect(() => {
    setValue('nextTierCode', nextCodeTierRank[watch()?.code]);
  }, [watch()]);
  return (
    <Page title={t('tierRankManage.list.createButton')}>
      <Container maxWidth={themeStretch ? 'sm' : 'xl'}>
        <HeaderBreadcrumbs
          heading={t('tierRankManage.list.createButton')}
          links={[
            { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
            {
              name: t('tierRankManage.list.title'),
              href: PATH_DASHBOARD.tierRankManage.list,
            },
            {
              name: t('tierRankManage.list.createButton'),
              href: PATH_DASHBOARD.popupManage.create,
            },
          ]}
        />
        <Paper elevation={5} sx={{ p: 3 }}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3} direction="column">
              <RHFTextField name="name" label="Tên" />
              <RHFTextField name="description" label="Mô tả" />
              <RHFSwitch name="isActive" label="Trạng thái" />
              <RHFTextField
                name="conditionPoint"
                type="number"
                label="Điều kiện đạt thứ hạng"
              />
              <RHFTextField
                name="maxPoint"
                type="number"
                label="Điểm tối đa của thứ hạng"
              />
              <RHFSelect name="code" label="Thứ hạng">
                {TYPE_CODE.map((item) => {
                  return (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  );
                })}
              </RHFSelect>
              <RHFTextField disabled name="nextTierCode" label="Thứ hạng tiếp theo" />
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
                {t('create')}
              </LoadingButton>
            </Stack>
          </FormProvider>
        </Paper>
      </Container>
    </Page>
  );
}
