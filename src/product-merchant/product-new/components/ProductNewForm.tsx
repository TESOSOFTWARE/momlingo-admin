import { yupResolver } from '@hookform/resolvers/yup';
import { Fab, FormHelperText, Paper, Stack } from '@mui/material';
import Box from '@mui/material/Box/Box';
import FormLabel from '@mui/material/FormLabel';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Iconify from '../../../common/components/Iconify';
import { FormProvider } from '../../../common/components/hook-form';
import useDeepEffect from '../../../common/hooks/useDeepEffect';
import useMessage from '../../../common/hooks/useMessage';
import { usePresignImg } from '../../../common/hooks/usePresignImg';
import { dispatch } from '../../../common/redux/store';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import { IListVariantParams } from '../../../product-variant/new-variant/interface';
import { useGetVariant } from '../../product-common/hooks/useGetVariant';
import { TaxStatus } from '../../product-common/interface';
import { customValueBoolean } from '../../product-common/utils/customValueBoolean';
import { useNewProduct } from '../hooks/useNewProduct';
import { defaultValuesNewProduct } from '../new-constants';
import { INewProduct, ISubmitData } from '../new-interface';
import { NewProductSchema } from '../schema/new.schema';
import {
  addVariantId,
  addVariantIdBackup,
  defaultVariantId,
  linkedWithExternal,
  listVariantsSelect,
  setAddVariantId,
  setAddVariantIdBackup,
  setDefaultId,
  setLinkedWithExternal,
  setListVariantSelect,
  setPopupVariant,
} from '../slice';
import AddVariantForm from './NewForm/AddVariantForm';
import DetailProductFrom from './NewForm/DetailProductForm';
import ModalAddVariant from './NewForm/ModalAddVariant';
import TypeProductForm from './NewForm/TypeProductForm';
import lodash from 'lodash';

export default function ProductNewForm() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { handleUpload } = usePresignImg();
  const methods = useForm<ISubmitData>({
    resolver: yupResolver(NewProductSchema),
    defaultValues: defaultValuesNewProduct,
  });
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting, errors },
  } = methods;
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const { mutate, isSuccess, error } = useNewProduct({
    onSuccess: () => {
      showSuccessSnackbar(`${t('productMerchant.new.addSuccess')}`);
      navigate(PATH_DASHBOARD.product.list);
      dispatch(setAddVariantId([]));
      dispatch(setListVariantSelect([]));
    },
    onError: () => {
      showErrorSnackbar(`${t('productMerchant.new.addFail')}, ${error}`);
      dispatch(setAddVariantId(selectVariantIdBackup));
    },
  });

  const isExternal = useSelector(linkedWithExternal);

  useEffect(() => {
    if (watch('type') === 'VIRTUAL') {
      dispatch(setLinkedWithExternal(true));
    } else {
      dispatch(setLinkedWithExternal(false));
    }
  }, [watch('type')]);

  const searchParams: IListVariantParams = {
    isLinkedWithExternal: isExternal,
    page: 1,
    limit: 100,
  };
  const { data: variantList } = useGetVariant(searchParams);

  const selectVariantId = useSelector(addVariantId);
  const selectVariantIdBackup = useSelector(addVariantIdBackup);

  useEffect(() => {
    dispatch(setAddVariantIdBackup(selectVariantId));
  }, [selectVariantId]);

  const detailVariant = variantList?.items || [];

  const selectVariantList = detailVariant.filter((item) =>
    selectVariantId.includes(item.id)
  );

  const { useDeepCompareEffect } = useDeepEffect();
  useDeepCompareEffect(() => {
    dispatch(setListVariantSelect(selectVariantList.slice()));
  }, [selectVariantList]);

  const listVariantSelect = useSelector(listVariantsSelect);

  const defaultIdVariant = useSelector(defaultVariantId);

  const onSubmit = async (dataSubmit: ISubmitData) => {
    const getTagIds = dataSubmit?.tagIds?.map((item) => item.id);
    const getCategoryIds = dataSubmit.categoryIds.map((item) => item.id);
    if (dataSubmit.thumbnailId === 0 && dataSubmit.photoURL === undefined) {
      showErrorSnackbar(t('productMerchant.new.thumbnail'));
    }

    const image = await getImageInfo(dataSubmit?.photoURL as File);
    const dataNewProduct: INewProduct = {
      type: dataSubmit.type,
      status: dataSubmit.status,
      isFeatured: dataSubmit.isFeatured,
      onSale: dataSubmit.onSale,
      thumbnailId: image?.id,
      taxStatus: customValueBoolean(
        dataSubmit.taxStatus,
        TaxStatus.taxable,
        TaxStatus.none
      ),
      tagIds: lodash.isEmpty(getTagIds) ? [] : getTagIds,
      categoryIds: getCategoryIds,
      productDetails: [
        {
          lang: dataSubmit.lang,
          name: dataSubmit.name,
          description: dataSubmit.description,
          shortDescription: dataSubmit.shortDescription,
          slug: dataSubmit.slug,
        },
      ],
      productVariantIds: selectVariantId,
      defaultProductVariantId: defaultIdVariant,
    };
    mutate({ data: dataNewProduct });
    dispatch(setDefaultId());
  };

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
    setValue('addForm', undefined);
    dispatch(
      setAddVariantId(
        selectVariantList.filter((item) => item.id !== id).map((value) => value.id)
      )
    );
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="row" spacing={3}>
        <Stack direction="column" spacing={3}>
          <DetailProductFrom
            handleDrop={handleDrop}
            errors={errors?.photoURL?.message}
            handleClickAdd={handleClickAdd}
          />
          <Paper
            elevation={3}
            sx={{
              paddingX: 3,
              paddingTop: 2,
              paddingBottom: 4,
              position: 'relative',
              ...(errors.addForm ? { border: '1.5px solid red' } : {}),
            }}
          >
            <ModalAddVariant checkType={watch('type')} />
            <Box sx={{ display: 'flex' }}>
              <Stack direction="column">
                <FormLabel>{t('productMerchant.new.addVariant')}</FormLabel>
                <FormLabel sx={{ fontStyle: 'italic', fontSize: '11px' }}>
                  {t('productMerchant.new.labelDefault')}
                </FormLabel>
              </Stack>
              <Fab
                size="small"
                sx={{
                  position: 'absolute',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  left: 0,
                  right: 0,
                  bottom: -20,
                }}
                onClick={handleClickAdd}
              >
                <Iconify icon="material-symbols:add" />
              </Fab>
            </Box>
            {listVariantSelect.map((item) => (
              <AddVariantForm
                key={item.id}
                detailVariants={item}
                handleDelete={() => handleDeleteVariant(item.id)}
                defaultId={item.id}
              />
            ))}
          </Paper>
          <FormHelperText sx={{ color: 'red', paddingLeft: 5 }}>
            {errors.addForm?.message}
          </FormHelperText>
        </Stack>

        <TypeProductForm
          errorsCategory={errors}
          errorsTag={errors}
          isSubmitting={isSubmitting}
        />
      </Stack>
    </FormProvider>
  );
}
