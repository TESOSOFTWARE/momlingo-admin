import { LoadingButton } from '@mui/lab';
import { Dialog, DialogContent, DialogTitle, Paper, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  FormProvider,
  RHFRadioGroup,
  RHFSelect,
  RHFTextField,
  RHFUploadSingleFile,
} from 'src/common/components/hook-form';
import { usePresignImg } from 'src/common/hooks/usePresignImg';
import { dispatch, useSelector } from 'src/common/redux/store';
import { fData } from 'src/common/utils/formatNumber';
import { typeLink } from 'src/noti-manage/constants';
import { useGetMobileRoutes } from '../hooks/useGetMobileRoutes';
import { IUpdateBanner } from '../interface';
import { updateSections } from '../slice';
import ParamsField from './Params';

export default function BannerLinkModal({
  isOpen,
  onClose,
  id,
}: {
  isOpen: boolean;
  onClose?: () => void;
  id: string;
}) {
  const methods = useForm<IUpdateBanner>({
    defaultValues: {
      deepLink: '',
      image: '',
      route: '',
      typeLink: typeLink[0].value,
      params: [],
    },
  });
  const { handleUpload } = usePresignImg();
  const { handleSubmit, setValue, watch, reset } = methods;
  const { data: mobileRoutes } = useGetMobileRoutes();
  const { t } = useTranslation();
  const { dataRequest } = useSelector((state) => state.configShareApp);

  const onSubmit = async (data: IUpdateBanner) => {
    const file = await handleUpload(data.image as File);
    const params: any = {};
    data?.params?.forEach((p: any) => {
      params[p?.key] = p?.value;
    });
    const dataReq = dataRequest?.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          data: [
            ...item.data,
            {
              image: file?.url,
              imageId: file?.id,
              link: data.typeLink === typeLink[0].value ? data.route : data.deepLink,
              typeRoute: data.typeLink,
              params: params,
            },
          ],
        };
      }
      return item;
    });
    dispatch(updateSections(dataReq));
    onClose && onClose();
  };

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        setValue(
          'image',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  useEffect(() => {
    if (watch('route')) {
      setValue(
        'name',
        mobileRoutes?.find((item) => item?.route === watch('route'))?.name
      );
    } else {
      setValue('name', '');
    }
    setValue('params', undefined);
  }, [watch('route')]);
  return (
    <div>
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>Thêm mới</DialogTitle>
        <DialogContent>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <Box>
                <RHFUploadSingleFile
                  name="image"
                  maxSize={3145728}
                  onDrop={handleDrop}
                  accept={{ 'image/*': [] }}
                  helperText={
                    <Typography
                      variant="caption"
                      sx={{
                        flex: 1,
                        mt: 2,
                        mx: 'auto',
                        display: 'block',
                        textAlign: 'center',
                        color: 'text.secondary',
                      }}
                    >
                      {t('allowed')} *.jpeg, *.jpg, *.png, *.gif
                      <br /> {t('max_size_of')} {fData(3145728)}
                    </Typography>
                  }
                />
              </Box>
              <Box>
                <Paper
                  elevation={3}
                  sx={{
                    padding: 3,
                  }}
                >
                  <Stack spacing={3} direction={'column'} alignItems={'center'}>
                    <RHFRadioGroup name="typeLink" options={typeLink} />
                    {watch('typeLink') === typeLink[1].value ? (
                      <RHFTextField name="deepLink" label="Nhập đường dẫn" />
                    ) : (
                      <>
                        <RHFSelect
                          name="route"
                          label="Điều hướng"
                          InputLabelProps={{ shrink: true }}
                        >
                          <option></option>
                          {mobileRoutes?.map((item: any, index: number) => (
                            <option key={index} value={item?.route}>
                              {item?.route}
                            </option>
                          ))}
                        </RHFSelect>
                        <RHFTextField
                          name="name"
                          type="name"
                          label="Tên trang"
                          disabled={true}
                          InputLabelProps={{ shrink: true }}
                          sx={{
                            marginTop: '20px',
                          }}
                        />
                        {mobileRoutes?.find((item) => item?.route === watch('route'))
                          ?.isNeedParams && <ParamsField />}
                      </>
                    )}
                  </Stack>
                </Paper>
                <Box display={'flex'} justifyContent={'center'} marginTop={'10px'}>
                  <Box>
                    <LoadingButton
                      // loading={isLoading}
                      type="submit"
                      variant="contained"
                      //   startIcon={<Iconify icon="material-symbols:add-circle-outline-rounded" />}
                    >
                      {'Thêm'}
                    </LoadingButton>
                  </Box>
                </Box>
              </Box>
            </Box>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </div>
  );
}