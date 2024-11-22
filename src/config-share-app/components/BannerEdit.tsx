import { LoadingButton } from '@mui/lab';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import {
  FormProvider,
  RHFRadioGroup,
  RHFSelect,
  RHFTextField,
  RHFUploadSingleFile,
} from 'src/common/components/hook-form';
import useMessage from 'src/common/hooks/useMessage';
import { usePresignImg } from 'src/common/hooks/usePresignImg';
import { dispatch, useSelector } from 'src/common/redux/store';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { fData } from 'src/common/utils/formatNumber';
import { typeLink } from 'src/noti-manage/constants';
import { useEditShareAppConfig } from '../hooks/useEditShareAppConfig';
import { useGetMobileRoute } from 'src/config-home/hooks/useGetMobileRoute';
import { IUpdateBanner } from '../interface';
import { updateSections } from '../slice';
import BannerLinkModal from './BannerLinkModal';
import ImageSectionCarouselEdit from './CarouselBanner';
import ParamsField from './Params';

export default function EditShareAppBanner() {
  const [isLoadingSave, setIsLoadingSave] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { t } = useTranslation();
  const params = useParams();
  const methods = useForm<IUpdateBanner>({
    defaultValues: {
      deepLink: '',
      image: '',
      name: '',
      route: '',
      title: '',
      typeLink: typeLink[0].value,
      params: [],
    },
  });
  const { mutate } = useEditShareAppConfig({
    onSuccess: () => {
      showSuccessSnackbar('Update Share App Screen Successfully');
      setIsLoadingSave(false);
    },
    onError: () => {
      showErrorSnackbar('Update Share App Screen Failed');
      setIsLoadingSave(false);
    },
  });
  const { handleUpload } = usePresignImg();
  const { handleSubmit, setValue, watch, reset } = methods;
  const [currentIndex, setCurrentIndex] = useState(0);
  const idBanner = params?.id;

  const { data: mobileRoutes } = useGetMobileRoute();
  const { dataRequest } = useSelector((state) => state.configShareApp);
  const dataBanner = dataRequest.find((item) => item.id === idBanner);
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const navigate = useNavigate();
  useEffect(() => {
    if (currentIndex < 0) {
      setValue('image', '');
      setValue('name', '');
      setValue('deepLink', '');
      setValue('route', '');
      setValue('typeLink', typeLink[0].value);
      setValue('params', undefined);
    } else {
      setValue('image', dataBanner?.data[currentIndex]?.image);
      setValue(
        'name',
        mobileRoutes?.find((item) => item?.route === dataBanner?.data[currentIndex]?.link)
          ?.name
      );
      const params = Object.keys(dataBanner?.data[currentIndex]?.params || {})?.map(
        (item) => {
          return {
            key: item,
            value: dataBanner?.data[currentIndex]?.params?.[item],
          };
        }
      );

      setValue('params', params as [{ key: string; value: string }]);
      setValue('typeLink', dataBanner?.data[currentIndex]?.typeRoute);
      if (dataBanner?.data[currentIndex]?.typeRoute === typeLink[1].value) {
        setValue('deepLink', dataBanner?.data[currentIndex]?.link);
        setValue('route', '');
      } else {
        setValue('route', dataBanner?.data[currentIndex]?.link);
        setValue('deepLink', '');
      }
    }
  }, [currentIndex, dataBanner]);

  useEffect(() => {
    if (dataBanner?.title) setValue('title', dataBanner?.title);
  }, [dataBanner?.title]);

  useEffect(() => {
    setValue('name', mobileRoutes?.find((item) => item?.route === watch('route'))?.name);
    if (!mobileRoutes?.find((item) => item?.route === watch('route'))?.isNeedParams) {
      setValue('params', undefined);
    }
  }, [watch('route')]);

  useEffect(() => {
    const dataReq = dataRequest?.map((item) => {
      if (item.id === idBanner) {
        return {
          ...item,
          title: watch('title'),
        };
      }
      return item;
    });
    dispatch(updateSections(dataReq));
  }, [watch('title')]);

  useEffect(() => {
    if (!dataBanner) {
      navigate(PATH_DASHBOARD.homeConfig.root);
    }
  }, [dataBanner]);

  const handleRemoveBanner = () => {
    const dataReq = dataRequest?.map((item) => {
      if (item.id === idBanner) {
        return {
          ...item,
          data: item.data?.filter((i: any, index: number) => {
            return index !== currentIndex;
          }),
        };
      }
      return item;
    });
    dispatch(updateSections(dataReq));
  };

  const onSubmit = async (data: IUpdateBanner) => {
    let file: any;
    if (typeof data.image !== 'string') {
      file = await handleUpload(data.image);
    }

    const dataReq = dataRequest?.map((item) => {
      const params: any = {};
      data?.params?.forEach((p: any) => {
        params[p?.key] = p?.value;
      });
      if (item.id === idBanner) {
        return {
          ...item,
          data: item.data?.map((i: any, index: number) => {
            if (index === currentIndex) {
              if (!file) {
                return {
                  ...i,
                  typeRoute: data.typeLink,
                  link: data.typeLink === typeLink[0].value ? data.route : data.deepLink,
                  params: params,
                };
              } else {
                return {
                  image: file?.url,
                  imageId: file?.id,
                  link: data.typeLink === typeLink[0].value ? data.route : data.deepLink,
                  typeRoute: data.typeLink,
                  params: params,
                };
              }
            }
            return i;
          }),
          title: data.title,
        };
      }
      return item;
    });
    dispatch(updateSections(dataReq));
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

  const saveEditBanner = () => {
    setIsLoadingSave(true);
    const data = dataRequest.map((item) => {
      return {
        ...item,
        data: item.data?.map((i: any) => {
          if (i?.params?.length) {
            const params: any = {};
            i?.params?.forEach((p: any) => {
              params[p?.key] = p?.value;
            });
            return {
              ...i,
              params: params,
            };
          } else {
            return {
              ...i,
            };
          }
        }),
      };
    });
    mutate(data);
  };

  return (
    <Box width={'100%'}>
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
        <Box>
          <HeaderBreadcrumbs
            heading={t('homeConfig')}
            links={[
              { name: t('dashboard'), href: PATH_DASHBOARD.root },
              {
                name: t('configShareApp.root'),
                href: PATH_DASHBOARD.configShareApp.root,
              },
              { name: t('edit') },
            ]}
          />
        </Box>
        <Box>
          <LoadingButton
            loading={isLoadingSave}
            variant="contained"
            onClick={saveEditBanner}
            sx={{ marginRight: '10px', width: '130px' }}
          >
            {'Lưu'}
          </LoadingButton>
          <Button
            sx={{ marginRight: '10px' }}
            variant="outlined"
            onClick={() => {
              setIsOpenModal(true);
            }}
          >
            Thêm
          </Button>
        </Box>
      </Box>

      <Box>
        {dataBanner?.data ? (
          <Box>
            <ImageSectionCarouselEdit
              product={dataBanner || []}
              setCurrentIndex={setCurrentIndex}
            />
          </Box>
        ) : (
          <Box sx={{ margin: 'auto' }}>
            <Typography>Chưa có ảnh</Typography>
          </Box>
        )}
      </Box>
      <Box mt={'110px'}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <RHFTextField
            name="title"
            type="name"
            label="Title"
            InputLabelProps={{ shrink: true }}
            sx={{
              marginBottom: '20px',
              width: '400px',
            }}
          />
          <Paper
            elevation={3}
            sx={{
              padding: 3,
            }}
          >
            <Typography
              sx={{
                color: '#666E80',
                fontSize: '18px',
                fontWeight: 600,
                marginBottom: '12px',
              }}
            >
              Cấu hình hình ảnh đã chọn
            </Typography>

            <Box
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
              width={'100%'}
            >
              <Box width={'60%'}>
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

              <Box
                sx={{
                  width: '40%',
                  ml: 2,
                  marginBottom: '48px',
                }}
              >
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
                    <LoadingButton type="submit" variant="contained">
                      {'Cập nhật'}
                    </LoadingButton>
                    <LoadingButton
                      sx={{
                        marginLeft: '5px',
                      }}
                      type="submit"
                      variant="contained"
                      onClick={handleRemoveBanner}
                    >
                      {'Xoá'}
                    </LoadingButton>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Paper>
        </FormProvider>
      </Box>
      {isOpenModal && (
        <BannerLinkModal
          id={idBanner as string}
          isOpen={isOpenModal}
          onClose={() => setIsOpenModal(false)}
        />
      )}
    </Box>
  );
}
