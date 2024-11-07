import { LoadingButton } from '@mui/lab';
import { Button, FormHelperText, FormLabel, Paper, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  RHFRadioGroup,
  RHFSelect,
  RHFSwitch,
} from '../../../../common/components/hook-form';
import { langProduct, statusProduct, typeProduct } from '../../new-constants';
import { useNavigate } from 'react-router-dom';
import { size } from 'lodash';
import { PATH_DASHBOARD } from '../../../../common/routes/paths';
import RHFSelectPagination from '../../../product-common/components/RHFSelectPagination/RHFSelectPagination';
import { useGetProductCategory } from '../../hooks/useGetProductCategory';
import { useGetProductTag } from '../../hooks/useGetProductTag';

type TypeProductProp = {
  errorsCategory: any;
  errorsTag: any;
  isSubmitting: boolean;
};
export default function TypeProductForm({
  errorsCategory,
  errorsTag,
  isSubmitting,
}: TypeProductProp) {
  const { t } = useTranslation();
  const navigate = useNavigate();

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
  return (
    <Stack direction="column" spacing={4}>
      <Paper elevation={3}>
        <Stack spacing={3} padding={3} sx={{ width: '320px' }}>
          <Stack direction="column" spacing={1} sx={{ paddingLeft: '5px' }}>
            <FormLabel id="type-label" sx={{ fontSize: '13px', marginLeft: '10px' }}>
              {t('productMerchant.new.productType')}
            </FormLabel>
            <RHFRadioGroup
              aria-labelledby="type-label"
              name="type"
              options={typeProduct}
            />
          </Stack>

          <RHFSelect name="status" label={t('productMerchant.new.labelStatus')}>
            {statusProduct.map((item) => (
              <option value={item.value} key={item.key}>
                {item.key}
              </option>
            ))}
          </RHFSelect>
          <RHFSelect name="lang" label={t('productMerchant.new.labelLang')}>
            {langProduct.map((item) => (
              <option value={item.value} key={item.key}>
                {item.key}
              </option>
            ))}
          </RHFSelect>

          <Stack direction="column" spacing={1}>
            <RHFSelectPagination
              name="categoryIds"
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

          <Stack direction="column" spacing={1}>
            <RHFSelectPagination
              name="tagIds"
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
      </Paper>

      <Paper elevation={3} sx={{ padding: 3 }}>
        <Stack spacing={3} direction="column">
          <RHFSwitch
            sx={{ marginLeft: '0.5px', width: '100%' }}
            name="onSale"
            label={t('productMerchant.new.labelOnSale')}
          />
          <RHFSwitch name="isFeatured" label={t('productMerchant.new.labelFeatured')} />
          <RHFSwitch name="taxStatus" label={t('productMerchant.new.labelTaxStatus')} />
        </Stack>
      </Paper>

      <Stack spacing={2} direction="column">
        <LoadingButton
          variant="contained"
          size="large"
          type="submit"
          loading={isSubmitting}
        >
          {t('productMerchant.new.createProduct')}
        </LoadingButton>
        <Button
          color="inherit"
          variant="contained"
          size="large"
          onClick={() => navigate(PATH_DASHBOARD.product.list)}
        >
          {t('productMerchant.new.cancel')}
        </Button>
      </Stack>
    </Stack>
  );
}
