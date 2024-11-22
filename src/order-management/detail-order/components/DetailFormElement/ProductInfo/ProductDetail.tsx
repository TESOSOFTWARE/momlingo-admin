import { TabContext, TabList } from '@mui/lab';
import {
  Box,
  Button,
  createStyles,
  Divider,
  FormLabel,
  Grid,
  makeStyles,
  Paper,
  Stack,
  Tab,
  Theme,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import useMessage from '../../../../../common/hooks/useMessage';

import { orderLineItemReqDto } from '../../../../list-physical/interface';
import { FormProvider } from '../../../../../common/components/hook-form';
import { StatusChip } from '../../../../../product-merchant/product-common/components/StatusChip';
import { ProductFeaturedMedal } from '../../../../../product-merchant/product-detail/components/ProductFeaturedMedal';
import { checkProductStatus } from '../../../../../product-merchant/product-common/utils/checkProductStatus';
import Iconify from '../../../../../common/components/Iconify';
import vn from '../../../../../common/locales/vn';
import en from '../../../../../common/locales/en';
import { IProductVariant } from '../../../../../product-merchant/product-detail/interface';
import { convertToPlain } from '../../../utils/convertToPlain';
import { useGetOrderById } from '../../../hooks/useGetOrderById';
import Image from '../../../../../common/components/Image';
import { replacePathParams } from '../../../../../common/utils/replaceParams';
import { PATH_DASHBOARD } from '../../../../../common/routes/paths';

export default function ProductDetailForm() {
  const navigate = useNavigate();
  const methods = useForm();
  const params = useParams();
  const idDetail = params?.id as unknown as number;
  const idProd = params?.idProd as unknown as number;
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const { data } = useGetOrderById({
    id: idDetail,
    callback: {
      onError: () => showErrorSnackbar(`$t{order.detail.failBar}`),
      onSuccess: () => {},
    },
  });
  const dataProductDetail = data?.orderLineItemReqDto?.find((itemOrderProd) => {
    return itemOrderProd?.product?.id === parseInt(idProd.toString());
  });
  const product = dataProductDetail?.product;
  const point = dataProductDetail?.point;
  const total = dataProductDetail?.total;
  const price = dataProductDetail?.price;
  const quantity = dataProductDetail?.quantity;

  const getPriceProduct =
    product?.productVariants?.map((item) => {
      return {
        salePrice: item?.salePrice,
        price: item?.price,
      };
    }) || [];

  const plainDescription = convertToPlain(product?.productDetails[0]?.description);

  const productVariantDetail =
    product?.productVariants.map((item): any => {
      return item;
    }) || [];

  const dataVariant = productVariantDetail[0];

  return (
    <FormProvider methods={methods}>
      <Paper elevation={3} sx={{ position: 'relative' }}>
        <Stack
          sx={{
            alignItems: 'center',
            width: 'fit-content',
            position: 'absolute',
            right: 35,
          }}
          direction="column"
        >
          <ProductFeaturedMedal productType={product?.isFeatured ?? false} />
        </Stack>

        <Grid container spacing={3} padding={3}>
          <Grid item xs={12} md={6} lg={6}>
            <Image src={product?.thumbnail?.url} />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Stack paddingTop={1} spacing={3}>
              <Stack direction="row" spacing={3}>
                <StatusChip
                  labelProps="ACTIVE"
                  isActive={product?.status === 'ACTIVE' ? true : false}
                />
                <StatusChip
                  labelProps={product?.type ?? ''}
                  isActive={checkProductStatus(product?.type ?? '')}
                  colorChipTrue="#00AAAC"
                  colorTextTrue="#EDFFFF"
                  colorChipFalse="#ff427647"
                  colorTextFalse="#EB1F6A"
                />
                <StatusChip
                  labelProps={product?.taxStatus ?? ''}
                  isActive={checkProductStatus(product?.taxStatus ?? '')}
                  colorTextTrue="#FFCA00"
                  colorChipTrue="#FAECB8"
                  colorTextFalse="#2046F6"
                  colorChipFalse="#A1DDF5"
                />
              </Stack>

              <Typography variant="h4">{product?.productDetails[0].name}</Typography>
              <Box
                sx={{
                  borderRadius: '3px',
                  bgcolor: '#F5F5F5',
                  paddingLeft: '10px',
                  position: 'relative',
                }}
              >
                <Typography variant="h3" color={'#4FB044'}>
                  {getPriceProduct.length > 0
                    ? getPriceProduct[0].salePrice | getPriceProduct[0].price
                    : "don't have price"}
                  <small>
                    <sup>
                      {' '}
                      <u>đ</u>
                    </sup>
                  </small>
                </Typography>
                {product?.onSale ?? false ? (
                  <Iconify
                    icon="foundation:burst-sale"
                    sx={{
                      position: 'absolute',
                      fontSize: '45px',
                      color: 'red',
                      top: -20,
                      right: 0,
                    }}
                  />
                ) : (
                  false
                )}
              </Box>

              <Grid container rowSpacing={1}>
                <Grid item xs={4}>
                  <FormLabel sx={{ width: 'max-content' }}>
                    {vn.DetailProduct.shortDes}
                  </FormLabel>
                </Grid>
                <Grid item xs={8}>
                  <Typography>{product?.productDetails[0]?.shortDescription}</Typography>
                </Grid>

                <Grid item xs={4}>
                  <FormLabel sx={{ width: 'max-content' }}>
                    {vn.DetailProduct.slug}
                  </FormLabel>
                </Grid>
                <Grid item xs={8}>
                  <Typography>{product?.productDetails[0]?.slug}</Typography>
                </Grid>

                <Grid item xs={4}>
                  <FormLabel sx={{ width: 'max-content' }}>
                    {vn.DetailProduct.lang}
                  </FormLabel>
                </Grid>
                <Grid item xs={8}>
                  <Typography>{product?.productDetails[0]?.lang}</Typography>
                </Grid>

                <Grid item xs={4}>
                  <FormLabel sx={{ width: 'max-content' }}>
                    {vn.DetailProduct.onSale}
                  </FormLabel>
                </Grid>
                <Grid item xs={8}>
                  <Typography>
                    {product?.onSale
                      ? `${vn.DetailProduct.trueSale}`
                      : `${vn.DetailProduct.failSale}`}
                  </Typography>
                </Grid>

                <Divider
                  sx={{ width: '100%', alignSelf: 'center', padding: '10px' }}
                ></Divider>

                <Grid container sx={{ width: '100%' }} rowSpacing={1}>
                  <Grid item xs={4}>
                    <FormLabel sx={{ width: 'max-content' }}>
                      {en.DetailProduct.sku}
                    </FormLabel>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography>{dataVariant?.sku}</Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <FormLabel sx={{ width: 'max-content' }}>
                      {en.DetailProduct.quantity}
                    </FormLabel>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography>{quantity}</Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <FormLabel sx={{ width: 'max-content' }}>
                      {en.DetailProduct.price}
                    </FormLabel>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography>{price}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <FormLabel sx={{ width: 'max-content' }}>xu</FormLabel>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography>{point}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <FormLabel sx={{ width: 'max-content' }}>Tổng</FormLabel>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography>{total}</Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <Stack spacing={1}>
                      {dataVariant?.productAttributeTerms?.map((item: any) => (
                        <FormLabel key={item?.id}>
                          {item?.productAttribute?.productAttributeDetails[0]?.name}
                        </FormLabel>
                      ))}
                    </Stack>
                  </Grid>

                  <Grid item xs={8}>
                    <Stack spacing={1}>
                      {dataVariant?.productAttributeTerms?.map((item: any) => (
                        <Typography key={item?.id}>
                          {item?.productAttributeTermDetails[0]?.value}
                        </Typography>
                      ))}
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
      <Paper elevation={3} sx={{ marginTop: 4 }}>
        <TabContext value={''}>
          <Box sx={{ px: 3, bgcolor: 'background.neutral' }}>
            <TabList>
              <Tab disableRipple value="1" label={vn.DetailProduct.des} />
            </TabList>
          </Box>

          <Divider />

          <Box padding={3}>{plainDescription}</Box>
        </TabContext>
      </Paper>

      <Stack marginTop={3} sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <Button
          onClick={() => {
            navigate(
              replacePathParams(PATH_DASHBOARD.order_management.detail, { id: idDetail })
            );
          }}
          variant="contained"
          sx={{ width: '150px' }}
        >
          Quay về
        </Button>
      </Stack>
    </FormProvider>
  );
}
