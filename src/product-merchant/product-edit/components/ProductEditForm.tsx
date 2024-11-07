import {
  Button,
  Fab,
  FormHelperText,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import {
  FormProvider,
  RHFEditor,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFUploadSingleFile,
} from '../../../common/components/hook-form';
import Iconify from '../../../common/components/Iconify';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import useDeepEffect from '../../../common/hooks/useDeepEffect';
import useMessage from '../../../common/hooks/useMessage';
import { usePresignImg } from '../../../common/hooks/usePresignImg';
import vn from '../../../common/locales/vn';
import { dispatch, useSelector } from '../../../common/redux/store';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import { fData } from '../../../common/utils/formatNumber';
import { IListVariantParams } from '../../../product-variant/new-variant/interface';
import { useGetVariant } from '../../product-common/hooks/useGetVariant';
import { IDetailProduct } from '../../product-common/interface';
import {
  defaultValuesEditProduct,
  langProduct,
  statusProduct,
  taxProduct,
  typeProduct,
} from '../edit-constants';
import { IConvertProduct, IEditProduct } from '../edit-interface';
import { useEditProduct } from '../hooks/useEditProduct';
import { useGetProductById } from '../hooks/useGetProductById';
import {
  linkedWithExternal,
  selectVariantId,
  setPopupVariant,
  setSelectVariantId,
} from '../slice';
import AddVariantForm from './AddVariantForm';
import ModalAddVariant from './ModalAddVariant';
import RHFSelectPagination from '../../product-common/components/RHFSelectPagination/RHFSelectPagination';
import { useGetProductCategory } from '../../product-new/hooks/useGetProductCategory';
import { useGetProductTag } from '../../product-new/hooks/useGetProductTag';
import { useTranslation } from 'react-i18next';

export default function ProductEditFrom() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const methods = useForm<IConvertProduct>();
  const {
    handleSubmit,
    reset,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = methods;
  const params = useParams();
  const { handleUpload } = usePresignImg();
  const idDetail = params?.id as unknown as number;
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const navigation = useNavigate();

  const searchParams: IListVariantParams = {
    page: 1,
    limit: 100,
  };

  const { data: dataListVariants } = useGetVariant(searchParams);
  const detailVariant = dataListVariants?.items || [];

  const idVariant = useSelector(selectVariantId);

  const client = useQueryClient();
  const { data: detailProduct } = useGetProductById({
    id: idDetail,
    callback: {
      onSuccess: () => {},
      onError: () => showErrorSnackbar('Get Product Fail'),
    },
  });

  const listVariantOld = detailProduct?.productVariants || [];
  const listIdVariantOld = listVariantOld.map((_variant) => _variant.id);

  useEffect(() => {
    const variants = detailProduct?.productVariants || [];
    if (variants.length > 0) dispatch(setSelectVariantId(listIdVariantOld));
    if (detailProduct) {
      reset({
        name: detailProduct.name,
        slug: detailProduct.slug,
        shortDescription: detailProduct.shortDescription,
        status: detailProduct.status,
        lang: detailProduct.lang,
        type: detailProduct.type,
        isFeatured: detailProduct.isFeatured,
        onSale: detailProduct.onSale,
        description: detailProduct.description,
        photoURL: detailProduct.thumbnail.url,
        categories: listCategories,
        tags: listTags,
        taxStatus: detailProduct.taxStatus,
        defaultProductVariantId: detailProduct.productVariants[0].id,
      });
    }
  }, [detailProduct]);

  const selectVariantList = detailVariant.filter((item) => idVariant.includes(item.id));

  const { mutate, isSuccess } = useEditProduct({
    onSuccess: () => showSuccessSnackbar(vn.EditProduct.editSuccess),
    onError: () => showErrorSnackbar(vn.EditProduct.editFail),
  });

  useEffect(() => {
    if (isSuccess) navigate(PATH_DASHBOARD.product.list);
  }, [isSuccess]);

  const queryData = client.getQueryData<IDetailProduct>([
    QUERY_KEYS.GET_PRODUCT_BY_ID,
    idDetail,
  ]);
  const { useDeepCompareEffect } = useDeepEffect();

  const listCategories =
    detailProduct?.productCategories.map((item) => {
      return {
        name: item?.categoryDetails[0]?.name,
        id: item?.id,
      };
    }) || [];
  const listTags =
    detailProduct?.productTags.map((item) => {
      return {
        name: item.name,
        id: item.id,
      };
    }) || [];

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        setValue(
          'photoURL',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  const getImageInfo = async (file: File): Promise<{ id: number; url: string }> => {
    const imgInfo = await handleUpload(file);
    return imgInfo;
  };

  const handleClickAdd = () => {
    dispatch(setPopupVariant(true));
  };

  const handleDeleteVariant = (id: number) => {
    dispatch(
      setSelectVariantId(
        selectVariantList.filter((item) => item.id !== id).map((value) => value.id)
      )
    );
  };


  const handleClickDeleteVariant = (idVariant: number) => {
    client.setQueryData([QUERY_KEYS.GET_PRODUCT_BY_ID, idDetail], (old: any) => {
      return {
        ...old,
        productVariants: queryData?.productVariants.filter(
          (item) => item.id !== idVariant
        ),
      };
    });
  };

  const oldThumbnailId = detailProduct?.thumbnail.id || 0;
  const oldThumbnailUrl = detailProduct?.thumbnail.url || '';

  const {
    dataProductCategory,
    fetchNextPageProductCategory,
    isFetchingNextPageProductCategory,
    isLoadingProductCategory,
  } = useGetProductCategory({ page: 1, limit: 20 });

  const {
    dataProductTag,
    isLoadingProductTag,
    fetchNextPageProductTag,
    isFetchingNextPageProductTag,
  } = useGetProductTag({ page: 1, limit: 20 });

  const listProductCategory =
    dataProductCategory?.pages
      ?.map((item) =>
        item?.items?.map((itemProd: any) => {
          return {
            id: itemProd.id,
            name: itemProd.categoryDetails[0].name,
          };
        })
      )
      .flat() || [];

  const listProductTag =
    dataProductTag?.pages
      ?.map((item) =>
        item?.items?.map((itemProd: any) => {
          return {
            id: itemProd.id,
            name: itemProd.name,
          };
        })
      )
      .flat() || [];

  const handleScrollProductCategory = (event: any) => {
    const listBoxNode = event?.currentTarget;
    const position = listBoxNode?.scrollTop + listBoxNode?.clientHeight;
    if (listBoxNode.scrollHeight - position <= 1) {
      fetchNextPageProductCategory();
    }
  };

  const handleScrollProductTag = (event: any) => {
    const listBoxNode = event?.currentTarget;
    const position = listBoxNode?.scrollTop + listBoxNode?.clientHeight;
    if (listBoxNode.scrollHeight - position <= 1) {
      fetchNextPageProductTag();
    }
  };

  const onSubmit = async (data: IConvertProduct) => {
    if (data?.photoURL !== oldThumbnailUrl) {
      const image = await getImageInfo(data?.photoURL as File);
      const dataEdit: IEditProduct = {
        type: data.type,
        status: data.status,
        isFeatured: data.isFeatured,
        onSale: data.onSale,
        thumbnailId: image.id,
        productDetails: [
          {
            lang: data.lang,
            name: data.name,
            description: data.description,
            shortDescription: data.shortDescription,
            slug: data.slug,
          },
        ],
        taxStatus: data.taxStatus,
        tagIds: data.tags.map((item) => item.id),
        categoryIds: data.categories.map((item) => item.id),
        productVariantIds: idVariant,
        id: idDetail,
        defaultProductVariantId: data.defaultProductVariantId,
      };

      mutate({ data: dataEdit });
    } else {
      const dataEdit: IEditProduct = {
        type: data.type,
        status: data.status,
        isFeatured: data.isFeatured,
        onSale: data.onSale,
        thumbnailId: oldThumbnailId,
        productDetails: [
          {
            lang: data.lang,
            name: data.name,
            description: data.description,
            shortDescription: data.shortDescription,
            slug: data.slug,
          },
        ],
        taxStatus: data.taxStatus,
        tagIds: data.tags.map((item) => item.id),
        categoryIds: data.categories.map((item) => item.id),
        productVariantIds: idVariant,
        id: idDetail,
        defaultProductVariantId: data.defaultProductVariantId,
      };

      mutate({ data: dataEdit });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Paper elevation={3} sx={{ padding: '15px' }}>
        <Typography variant="h5">{vn.EditProduct.basicInfo}</Typography>
        <Stack direction="column" spacing={2} margin="15px">
          <RHFTextField
            name="name"
            label={vn.EditProduct.labelName}
            InputLabelProps={{ shrink: true }}
          />

          <Stack direction="row" spacing={3}>
            <RHFTextField name="slug" label="Slug" InputLabelProps={{ shrink: true }} />
            <RHFTextField
              name="shortDescription"
              label="Short Description"
              InputLabelProps={{ shrink: true }}
            />
          </Stack>

          <Stack direction="row" spacing={3}>
            <Stack direction="column" spacing={1} sx={{ width: '100%' }}>
              <RHFSelectPagination
                name="categories"
                options={listProductCategory}
                labelProp="name"
                label={t('productMerchant.new.labelCategory')}
                listBoxScroll={handleScrollProductCategory}
                loadingScroll={isFetchingNextPageProductCategory}
                isLoading={isLoadingProductCategory}
                sx={{
                  '& .MuiInputBase-root.Mui-disabled': {
                    '& .MuiOutlinedInput-notchedOutline': {
                      backgroundColor: 'rgba(103, 99, 101, 0.1)',
                    },
                  },
                }}
              />
            </Stack>

            <Stack direction="column" spacing={1} sx={{ width: '100%' }}>
              <RHFSelectPagination
                name="tags"
                options={listProductTag}
                labelProp="name"
                label={t('productMerchant.new.labelTag')}
                listBoxScroll={handleScrollProductTag}
                loadingScroll={isFetchingNextPageProductTag}
                isLoading={isLoadingProductTag}
                sx={{
                  '& .MuiInputBase-root.Mui-disabled': {
                    '& .MuiOutlinedInput-notchedOutline': {
                      backgroundColor: 'rgba(103, 99, 101, 0.1)',
                    },
                  },
                }}
              />
            </Stack>
          </Stack>

          <Stack direction="row" spacing={3}>
            <RHFSelect name="taxStatus" label={vn.EditProduct.labelTax}>
              {taxProduct.map((item) => (
                <option value={item.value} key={item.label}>
                  {item.label}
                </option>
              ))}
            </RHFSelect>
            <RHFSelect name="status" label={vn.EditProduct.labelStatus}>
              {statusProduct.map((item) => (
                <option value={item.value} key={item.key}>
                  {item.key}
                </option>
              ))}
            </RHFSelect>
          </Stack>

          <Stack direction="row" spacing={3}>
            <RHFSelect name="lang" label={vn.EditProduct.labelLang}>
              {langProduct.map((item) => (
                <option value={item.value} key={item.key}>
                  {item.key}
                </option>
              ))}
            </RHFSelect>
            <RHFSelect name="type" label={vn.EditProduct.labelType} disabled>
              {typeProduct.map((item) => (
                <option value={item.value} key={item.label}>
                  {item.label}
                </option>
              ))}
            </RHFSelect>
          </Stack>

          <Stack direction="row" spacing={3} paddingLeft={3}>
            <RHFSwitch name={'isFeatured'} label={vn.EditProduct.labelFeatured} />
            <RHFSwitch name={'onSale'} label={vn.EditProduct.labelOnSale} />
          </Stack>

          <RHFUploadSingleFile
            name="photoURL"
            maxSize={3145728}
            onDrop={handleDrop}
            accept={{ 'image/*': [] }}
            helperText={
              <Typography
                variant="caption"
                sx={{
                  mt: 2,
                  mx: 'auto',
                  display: 'block',
                  textAlign: 'center',
                  color: 'text.secondary',
                }}
              >
                Allowed *.jpeg, *.jpg, *.png, *.gif
                <br />
                Max size: {fData(3145728)}
              </Typography>
            }
          />
          <RHFEditor name={'description'} />
        </Stack>
      </Paper>

      <Paper elevation={3} sx={{ padding: '30px 0 30px 15px', marginTop: '30px' }}>
        <Stack
          direction="row"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 2,
          }}
        >
          <Typography variant="h5">{vn.EditProduct.variantInfo}</Typography>
          <Stack sx={{ paddingRight: 4 }}>
            <Tooltip title="Add Variant" placement="right-start">
              <Fab size="small" color="secondary" onClick={handleClickAdd}>
                <Iconify icon="material-symbols:add" />
              </Fab>
            </Tooltip>
          </Stack>
        </Stack>
        <ModalAddVariant checkType={detailProduct?.type || ''} />
        <Stack
          spacing={3}
          sx={{
            border: '1px solid #c4cdd557',
            borderRadius: '8px',
            padding: '25px',
            marginRight: '30px',
            marginLeft: '15px',
          }}
        >
          <Stack direction="column" spacing={2}>
            {selectVariantList.map((item) => (
              <AddVariantForm
                key={item.id}
                detailVariants={item}
                handleDelete={() => handleDeleteVariant(item.id)}
                defaultId={item.id}
              />
            ))}
          </Stack>
        </Stack>

        <Stack
          marginTop={6}
          marginRight={7}
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
          spacing={2}
        >
          <Button variant="contained" type="submit">
            {vn.saveChange}
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => navigation(PATH_DASHBOARD.product.list)}
          >
            {vn.cancel}
          </Button>
        </Stack>
      </Paper>
    </FormProvider>
  );
}
