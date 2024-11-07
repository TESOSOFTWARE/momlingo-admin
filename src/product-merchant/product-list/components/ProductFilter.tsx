import { Button, Container, InputAdornment, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { FormProvider, RHFSelect, RHFTextField } from 'src/common/components/hook-form';
import Iconify from 'src/common/components/Iconify';
import vn from '../../../common/locales/vn';
import { dispatch } from '../../../common/redux/store';
import {
  DEFAULT_SEARCH_PRODUCT,
  productTypeFilter,
  statusFilter,
  taxFilter,
  typeFilter,
} from '../product-constant';
import { IProductParams } from '../product-interface';
import { setDataFilter } from '../product-slice';

type Props = {
  onSetPage: (value: number) => void;
};

export default function ProductFilter({ onSetPage }: Props) {
  const methods = useForm<IProductParams>({
    defaultValues: DEFAULT_SEARCH_PRODUCT,
  });
  const {
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = methods;

  const checkValuesLabel = (data: string | undefined) => {
    if (data === statusFilter[0].label) {
      return (data = undefined);
    }
    if (data === typeFilter[0].label) {
      return (data = undefined);
    }
    if (data === taxFilter[0].label) {
      return (data = undefined);
    }
    if (data === productTypeFilter[0].label) {
      return (data = undefined);
    } else return data;
  };

  const onSubmit = (data: IProductParams) => {
    const dataFilter = {
      searchText: data.searchText,
      searchType: 'NAME',
      productStatus: checkValuesLabel(data.productStatus),
      taxStatus: checkValuesLabel(data.taxStatus),
      productType: checkValuesLabel(data.productType),
    };
    onSetPage(0);
    dispatch(setDataFilter(dataFilter));
  };

  const handleClearClick = () => {
    reset({
      searchText: '',
      productStatus: statusFilter[0].label,
      taxStatus: taxFilter[0].label,
      productType: productTypeFilter[0].label,
    });
    dispatch(setDataFilter(DEFAULT_SEARCH_PRODUCT));
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="column" spacing={2} mb={2} px={2}>
        <Stack direction="row" spacing={3}>
          <RHFTextField
            size="medium"
            sx={{ display: 'flex', flexGrow: '1' }}
            fullWidth
            name="searchText"
            placeholder={vn.ListProduct.searchPlacehoder}
            label={vn.ListProduct.labelSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify
                    icon={'eva:search-fill'}
                    sx={{ color: 'text.disabled', width: 20, height: 20 }}
                  />
                </InputAdornment>
              ),
            }}
          />
          {/* 
          <RHFSelect name="searchType" label={vn.ListProduct.labelType} size="small">
            {typeFilter.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </RHFSelect> */}
        </Stack>

        <Stack direction="row" spacing={3}>
          <RHFSelect
            size="small"
            name="productStatus"
            label={vn.ListProduct.labelStatus}
            sx={{ maxWidth: '300px' }}
          >
            {statusFilter.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </RHFSelect>
          <RHFSelect name="taxStatus" label={vn.ListProduct.labelTaxStatus} size="small">
            {taxFilter.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </RHFSelect>
          <RHFSelect
            name="productType"
            label={vn.ListProduct.labelProductType}
            size="small"
          >
            {productTypeFilter.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </RHFSelect>
        </Stack>

        <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-start' }}>
          <Button
            variant="contained"
            type="submit"
            startIcon={<Iconify icon="ic:outline-search" />}
          >
            {vn.ListProduct.search}
          </Button>

          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="ph:x-bold" />}
            onClick={handleClearClick}
          >
            {vn.ListProduct.clear}
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  );
}
