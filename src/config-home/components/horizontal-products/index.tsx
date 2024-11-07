import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import HeaderBreadcrumbs from '../../../common/components/HeaderBreadcrumbs';
import { FormProvider } from '../../../common/components/hook-form';
import { dispatch, useSelector } from '../../../common/redux/store';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import { IDataRequest, ITypeSection } from '../../interface';
import { getCategoryList } from '../../services';
import ProductCarousel1 from '../product1/ProductCarousel1';
import ProductCarousel2 from '../product2/ProductCarousel2';
import { SelectPaginationSingleHorizontal } from './SelectPaginationSingleHorizontal';
import { useGetCategoriesById } from '../../../category/hooks/useGetCategoryById';
import { LoadingButton } from '@mui/lab';
import { useEditHomeSections } from '../../hooks/useEditHomeSections';
import useMessage from '../../../common/hooks/useMessage';
import { updateSections } from '../../slice';

export default function HorizontalProductEdit() {
  const params = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const methods = useForm();

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = methods;

  const [item, setItem] = useState<IDataRequest>();

  const [isLoadingSave, setIsLoadingSave] = useState(false);

  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const { mutate } = useEditHomeSections();

  const id = params?.id;
  const type = params?.type;
  const { dataRequest } = useSelector((state) => state.homeConfigurationReducer);

  useEffect(() => {
    const item = dataRequest.find((item) => item.id === id && item.type === type);
    if (!item) {
      navigate(PATH_DASHBOARD.homeConfig.root);
    }
    setItem(item);
  }, [dataRequest, type, id]);

  const { data } = useGetCategoriesById(item?.data?.categoryId);

  useEffect(() => {
    if (item?.data?.categoryId && data?.categoryDetails?.[0]?.name) {
      setValue('productGroup', {
        value: item?.data?.categoryId,
        label: data?.categoryDetails?.[0]?.name,
      });
    }
  }, [item?.data?.categoryId, data?.categoryDetails?.[0]?.name]);

  useEffect(() => {}, [watch('productGroup')]);

  const onSubmit = (data: any) => {
    const dataReq = dataRequest?.map((item) => {
      if (item.type === type && item.id === id) {
        return {
          ...item,
          // data: item.data?.map((i: any, index: number) => {
          //   return i;
          // }),
          data: {
            ...data,
            categoryId: data?.productGroup?.value,
            maxLength: 5,
            products: [],
          },
          title: data?.productGroup?.label,
        };
      }
      return item;
    });
    setIsLoadingSave(true);
    const newData = {
      sections: dataReq,
    };
    mutate(newData, {
      onSuccess: () => {
        showSuccessSnackbar('Update Home Screen Successfully');
        setIsLoadingSave(false);
        navigate(PATH_DASHBOARD.homeConfig.root);
      },
      onError: () => {
        showErrorSnackbar('Update Home Screen Failed');
        setIsLoadingSave(false);
      },
    });
  };

  return (
    <Box width={'100%'}>
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
        <Box>
          <HeaderBreadcrumbs
            heading={t('homeConfig')}
            links={[
              { name: t('dashboard'), href: PATH_DASHBOARD.root },
              { name: t('homeConfig'), href: PATH_DASHBOARD.homeConfig.root },
              { name: t('edit') },
            ]}
          />
        </Box>
      </Box>
      <Typography
        sx={{
          fontWeight: 550,
          fontSize: '18px',
          color: '#666E80',
          marginBottom: '20px',
        }}
      >
        {item?.title}
      </Typography>
      {type === ITypeSection.HORIZONTAL_PRODUCT_LIST_1 && (
        <ProductCarousel1 item={item?.data?.products} />
      )}
      {type === ITypeSection.HORIZONTAL_PRODUCT_LIST_2 && (
        <ProductCarousel2 item={item?.data?.products} />
      )}

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Box display={'flex'} justifyContent={'flex-end'}>
          <Box width={'500px'} marginTop={'40px'} marginRight={'10px'}>
            <SelectPaginationSingleHorizontal
              name="productGroup"
              placeholder={'Tên nhóm sản phẩm'}
              getAsyncData={getCategoryList}
              error={errors}
            />
          </Box>
        </Box>
        <Box display={'flex'} justifyContent={'flex-end'} margin={'10px'}>
          <LoadingButton type="submit" variant="contained" loading={isLoadingSave}>
            {'Cập nhật'}
          </LoadingButton>
        </Box>
      </FormProvider>
    </Box>
  );
}
