import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { IInitialState, IGiftListResponse, ProductType } from './interface';
import * as lodash from 'lodash';

const initialState: IInitialState = {
  status: 'DRAFT',
  fields: [],
  isOpenModalPreviewWheel: false,
  productList: [],
  productVariant: [],
};

export const configWheelSlice = createSlice({
  name: 'config-wheel',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
    setIsOpenModalPreviewWheel: (state, action: PayloadAction<boolean>) => {
      state.isOpenModalPreviewWheel = action.payload;
    },
    setProductList: (state, action: PayloadAction<any>) => {
      state.productList = action.payload?.map((item: any) => {
        state.productVariant = item?.productVariants?.map((variant: any) => ({
          label: variant?.sku,
          value: variant?.productToVariantId,
        }));
        return {
          // @ts-ignore
          label: item?.productDetails[0]?.name,
          value: item?.id,
        };
      });
    },
    handleAddNewRow: (state, action) => {
      state.fields.push(action.payload);
    },
    setRowValue: (state, action) => {
      state.fields.forEach((item) => {
        if (item?.id === action.payload?.data?.id) {
          item.ordinal = 0;
          item.amount = action.payload.data.amount;
          item.productId = action.payload.data?.productId;
          item.productToVariantId = action.payload.data?.productVariantId;
          item.winRate = action.payload.data?.winRate;
          const { id, type, ...rest } = item;

          const newItem = lodash.pickBy(rest, (property) => property !== undefined);
          // @ts-ignore
          item = newItem;
        }
      });
    },
    handleRemoveRow: (state, action) => {
      state.fields = state.fields.filter((item) => item?.id !== action.payload);
    },
  },
});

export const {
  actions: {
    setStatus,
    setIsOpenModalPreviewWheel,
    setProductList,
    handleAddNewRow,
    setRowValue,
    handleRemoveRow,
  },
  reducer,
} = configWheelSlice;
