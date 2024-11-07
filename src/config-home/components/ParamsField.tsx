import { Box, IconButton, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import Iconify from '../../common/components/Iconify';
import { RHFSelect, RHFTextField } from '../../common/components/hook-form';
import { RHFSelectPaginationSingle } from '../../code-manage/code-create/components/RHFSelectPaginationSingle';
import { getEvent } from '../../code-manage/code-create/create.service';
import { getListSurveys } from '../../survey/common/survey.service';
import { ROUTE_DATA } from '../constants';
import RHFSelectProductVirtual from '../../game-gift/common/components/RHFSelectProductVirtual';
import { useGetProductVirtual } from '../../game-gift/hooks/useGetProductVirtual';
import { TypesExternal } from '../../product-variant/new-variant/constant';
import { RHFSelectPaginationExternal } from '../../product-variant/new-variant/components/elements/RHFSelectPaginationExternal';
import { getExternalProduct } from '../../product-variant/new-variant/service';
import { RHFSelectPaginationPolicyTerm } from './RHFSelectPaginationPolicyTerm';
import { getListTermPolicy } from '../../terms-policy/common/service';

export default function ParamsField() {
  const { control, watch, setValue } = useFormContext();

  const {
    data: dataProductVirtual,
    fetchNextPage: fetchNextPageProductVirtual,
    isFetchingNextPage: isFetchingNextPageProductVirtual,
  } = useGetProductVirtual({
    page: 1,
    limit: 20,
  });

  const listProductVirtual =
    dataProductVirtual?.pages?.map((item) => item?.items).flat() || [];

  const dataItemSelectProductVirtual =
    listProductVirtual?.map((item) => {
      return {
        id: item?.id,
        productDetails: item?.productDetails[0],
        name: item?.productDetails[0]?.name,
        thumbnail: item?.thumbnail,
        productVariants: item?.productVariants,
      };
    }) || [];

  // useEffect(() => {
  //   setValue('params', null);
  // }, [watch('route')]);

  const handleScrollProductVirtual = (event: any) => {
    const listBoxNode = event?.currentTarget;
    const position = listBoxNode?.scrollTop + listBoxNode?.clientHeight;
    if (listBoxNode.scrollHeight - position <= 1) {
      fetchNextPageProductVirtual();
    }
  };

  return (
    <Box width={'100%'}>
      {watch('route') === ROUTE_DATA.SURVEY_DETAIL && (
        <RHFSelectPaginationSingle
          name="params"
          placeholder={'Detail'}
          getAsyncData={getListSurveys}
          error={false}
        />
      )}
      {watch('route') === ROUTE_DATA.PRODUCT_DETAIL && (
        <RHFSelectProductVirtual
          name="params"
          options={dataItemSelectProductVirtual}
          labelProp="name"
          label="Sản phẩm"
          linkedFieldName="productVariantId"
          listBoxScroll={handleScrollProductVirtual}
          loadingScroll={isFetchingNextPageProductVirtual}
        />
      )}
      {(watch('route') === ROUTE_DATA.VOUCHER_DETAIL ||
        watch('route') === ROUTE_DATA.VOUCHER_USED_DETAIL) && (
        <RHFSelectPaginationExternal
          name={'params'}
          getAsyncData={getExternalProduct}
          placeholder={'VOUCHER'}
          error={false}
          types={'VOUCHER'}
        />
      )}
      {watch('route') === ROUTE_DATA.POLICY_DETAIL && (
        <RHFSelectPaginationPolicyTerm
          name={'params'}
          getAsyncData={getListTermPolicy}
          placeholder={'POLICY'}
          error={false}
        />
      )}
    </Box>
  );
}
