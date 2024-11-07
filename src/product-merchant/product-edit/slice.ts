import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../common/redux/store';
import { defaultValueVariant } from './edit-constants';
import { IEditSliceProps, IVariant } from './edit-interface';

const initialState: IEditSliceProps = {
  productVariant: defaultValueVariant,
  isPopupVariant: false,
  variantId: [],
  isChecked: false,
  variantIdBefore: [],
  variantIdOld: [],
  defaultVariantId: 0,
  isReset: 0,
  isNotice: false,
  isLinkedWithExternal: false,
};

export const editProductReducer = createSlice({
  name: 'editProduct',
  initialState,
  reducers: {
    setDataVariant: (state, action: PayloadAction<IVariant[]>) => {
      state.productVariant = action.payload;
    },
    setPopupVariant(state, action: PayloadAction<boolean>) {
      state.isPopupVariant = action.payload;
    },
    setSelectVariantId(state, action: PayloadAction<number[]>) {
      state.variantId = action.payload;
    },
    setVariantIdBefore(state, action: PayloadAction<number[]>) {
      state.variantIdBefore = action.payload;
    },
    setVariantIdOld(state, action: PayloadAction<number[]>) {
      state.variantIdOld = action.payload;
    },
    setChecked(state, action: PayloadAction<boolean>) {
      state.isChecked = action.payload;
    },
    setDefaultId(state) {
      state.variantId = [];
    },
    setDefaultVariantId(state, action: PayloadAction<number>) {
      state.defaultVariantId = action.payload;
    },
    setReset(state, action: PayloadAction<number>) {
      state.isReset = action.payload;
    },
    setNotice(state, action: PayloadAction<boolean>) {
      state.isNotice = action.payload;
    },
    setLinkedWithExternal(state, action: PayloadAction<boolean>) {
      state.isLinkedWithExternal = action.payload;
    },
  },
});

export const {
  setDataVariant,
  setPopupVariant,
  setSelectVariantId,
  setChecked,
  setDefaultId,
  setVariantIdBefore,
  setVariantIdOld,
  setDefaultVariantId,
  setReset,
  setNotice,
  setLinkedWithExternal,
} = editProductReducer.actions;

export const dataVariant = (state: RootState) => state.editProduct.productVariant;
export const showPopupVariant = (state: RootState) => state.editProduct.isPopupVariant;
export const selectVariantId = (state: RootState) => state.editProduct.variantId;
export const selectVariantIdBefore = (state: RootState) =>
  state.editProduct.variantIdBefore;
export const selectVariantIdOld = (state: RootState) => state.editProduct.variantIdOld;
export const checked = (state: RootState) => state.editProduct.isChecked;
export const defaultVariantId = (state: RootState) => state.editProduct.defaultVariantId;
export const noticeReset = (state: RootState) => state.editProduct.isReset;
export const notice = (state: RootState) => state.editProduct.isNotice;
export const linkedWithExternal = (state: RootState) =>
  state.editProduct.isLinkedWithExternal;

export default editProductReducer.reducer;
