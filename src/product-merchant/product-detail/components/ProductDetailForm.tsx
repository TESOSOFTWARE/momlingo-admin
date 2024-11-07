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
// import {styled} from '@mui/system';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { FormProvider } from '../../../common/components/hook-form';
import Iconify from '../../../common/components/Iconify';
import useMessage from '../../../common/hooks/useMessage';
import en from '../../../common/locales/en';
import vn from '../../../common/locales/vn';
import { dispatch } from '../../../common/redux/store';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import { replacePathParams } from '../../../common/utils/replaceParams';
import { StatusChip } from '../../product-common/components/StatusChip';
import { checkProductStatus } from '../../product-common/utils/checkProductStatus';
import { removeUndefined } from '../../product-common/utils/removeUndefined';
import { useGetProductById } from '../hooks/useGetProductById';
import { IConvertDataDetail, IProductVariant } from '../interface';
import {
  idProductVariant,
  setAttributeTermButton,
  setIdVariant,
  setShowDataVariant,
  toggleAttributeButton,
} from '../slice';
import { convertToPlain } from '../utils/convertToPlain';
import { ChipTag } from './ChipTag';
import ProductDetailsCarousel from './ProductDetailCarousel/ProductDetailsCarousel';
import { ProductFeaturedMedal } from './ProductFeaturedMedal';

export default function ProductDetailForm() {
  const navigate = useNavigate();
  const methods = useForm();
  const params = useParams();
  const idDetail = params?.id as unknown as number;
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const { data: detailProduct } = useGetProductById({
    id: idDetail,
    callback: {
      onSuccess: () => {},
      onError: () => showErrorSnackbar('Get Product Fail'),
    },
  });
  const imagesShow = detailProduct?.totalImages || [''];
  const detailsProduct: IConvertDataDetail = removeUndefined(detailProduct);
  const alignment = useSelector(toggleAttributeButton);
  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    dispatch(setAttributeTermButton(newAlignment));
  };
  const listNameCategory = detailProduct?.productCategoriesName || [];

  const listNameTag = detailProduct?.productTagsName || [];

  const getPriceProduct =
    detailProduct?.productVariants?.map((item) => {
      return {
        salePrice: item?.salePrice,
        price: item?.price,
      };
    }) || [];

  const plainDescription = convertToPlain(detailsProduct.description);

  const productVariantDetail =
    detailProduct?.productVariants.map((item): IProductVariant => {
      return item;
    }) || [];

  const handleClick = (id: number) => {
    dispatch(setIdVariant(id));
    dispatch(setShowDataVariant(true));
  };

  const idVariant = useSelector(idProductVariant);
  const dataVariant = productVariantDetail.find((object) => object.id === idVariant);

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
          <ProductFeaturedMedal productType={detailsProduct.isFeatured} />
        </Stack>

        <Grid container spacing={3} padding={3}>
          <Grid item xs={12} md={6} lg={6}>
            <ProductDetailsCarousel showImages={imagesShow} />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Stack paddingTop={1} spacing={3}>
              <Stack direction="row" spacing={3}>
                <StatusChip labelProps="ACTIVE" isActive={true} />
                <StatusChip
                  labelProps={detailsProduct.type}
                  isActive={checkProductStatus(detailsProduct.type)}
                  colorChipTrue="#00AAAC"
                  colorTextTrue="#EDFFFF"
                  colorChipFalse="#ff427647"
                  colorTextFalse="#EB1F6A"
                />
                <StatusChip
                  labelProps={detailsProduct.taxStatus}
                  isActive={checkProductStatus(detailsProduct.taxStatus)}
                  colorTextTrue="#FFCA00"
                  colorChipTrue="#FAECB8"
                  colorTextFalse="#2046F6"
                  colorChipFalse="#A1DDF5"
                />
              </Stack>

              <Typography variant="h4">{detailsProduct.name}</Typography>
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
                {detailsProduct.onSale ? (
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
                  <Typography>{detailProduct?.shortDescription}</Typography>
                </Grid>

                <Grid item xs={4}>
                  <FormLabel sx={{ width: 'max-content' }}>
                    {vn.DetailProduct.slug}
                  </FormLabel>
                </Grid>
                <Grid item xs={8}>
                  <Typography>{detailProduct?.slug}</Typography>
                </Grid>

                <Grid item xs={4}>
                  <FormLabel sx={{ width: 'max-content' }}>
                    {vn.DetailProduct.lang}
                  </FormLabel>
                </Grid>
                <Grid item xs={8}>
                  <Typography>{detailProduct?.lang}</Typography>
                </Grid>

                <Grid item xs={4}>
                  <FormLabel sx={{ width: 'max-content' }}>
                    {vn.DetailProduct.onSale}
                  </FormLabel>
                </Grid>
                <Grid item xs={8}>
                  <Typography>
                    {detailProduct?.onSale
                      ? `${vn.DetailProduct.trueSale}`
                      : `${vn.DetailProduct.failSale}`}
                  </Typography>
                </Grid>

                <Grid item xs={4}>
                  <FormLabel sx={{ width: 'max-content' }}>
                    {vn.DetailProduct.category}
                  </FormLabel>
                </Grid>
                <Grid item xs={8}>
                  <Stack spacing={1} direction="row">
                    {listNameCategory.map((value) => (
                      <ChipTag labelProp={value} key={value} colorChip="#00A5E2" />
                    ))}
                  </Stack>
                </Grid>

                <Grid item xs={4}>
                  <FormLabel sx={{ width: 'max-content' }}>
                    {vn.DetailProduct.tag}
                  </FormLabel>
                </Grid>
                <Grid item xs={8}>
                  <Stack spacing={1} direction="row">
                    {listNameTag.map((value) => (
                      <ChipTag labelProp={value} key={value} colorChip="#F78200" />
                    ))}
                  </Stack>
                </Grid>

                <Divider
                  sx={{ width: '100%', alignSelf: 'center', padding: '10px' }}
                ></Divider>

                <Grid container sx={{ width: '100%' }} rowSpacing={1}>
                  <Grid item xs={4}>
                    <FormLabel sx={{ width: 'max-content' }}>
                      {vn.DetailProduct.variant}
                    </FormLabel>
                  </Grid>

                  <Grid item xs={8}>
                    <ToggleButtonGroup
                      value={alignment}
                      exclusive
                      onChange={handleAlignment}
                      aria-label="text alignment"
                      color="success"
                      sx={{
                        border: 'none',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                      }}
                    >
                      {productVariantDetail.map((item) => (
                        <>
                          <ToggleButton
                            onClick={() => handleClick(item.id)}
                            key={item.id}
                            value={item.id}
                          >
                            <Box
                              component="img"
                              sx={{
                                height: 90,
                                width: 90,
                                maxHeight: { xs: 233, md: 167 },
                                maxWidth: { xs: 350, md: 250 },
                                borderRadius: '7px',
                              }}
                              alt={`${item.id}`}
                              src={`${item.images[0].url}`}
                            ></Box>
                          </ToggleButton>
                        </>
                      ))}
                    </ToggleButtonGroup>
                  </Grid>

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
                    <Typography>{dataVariant?.quantity}</Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <FormLabel sx={{ width: 'max-content' }}>
                      {en.DetailProduct.price}
                    </FormLabel>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography>{dataVariant?.price}</Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <FormLabel sx={{ width: 'max-content' }}>
                      {en.DetailProduct.salePrice}
                    </FormLabel>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography>{dataVariant?.salePrice}</Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <Stack spacing={1}>
                      {dataVariant?.productAttributeTerms?.map((item) => (
                        <FormLabel key={item?.id}>
                          {item?.productAttribute?.productAttributeDetails[0]?.name}
                        </FormLabel>
                      ))}
                    </Stack>
                  </Grid>

                  <Grid item xs={8}>
                    <Stack spacing={1}>
                      {dataVariant?.productAttributeTerms?.map((item) => (
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
            navigate(replacePathParams(PATH_DASHBOARD.product.edit, { id: idDetail }));
          }}
          variant="contained"
          sx={{ width: '150px' }}
        >
          Sửa sản phẩm
        </Button>
      </Stack>
    </FormProvider>
  );
}
