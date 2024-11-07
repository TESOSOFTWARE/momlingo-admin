import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../common/redux/store';
import { INewSliceProps } from './new-interface';
import { Variant } from '../product-common/components/VariantTable/interface';

const initialState: INewSliceProps = {
  isPopupVariant: false,
  variantId: [],
  variantIdBackup: [],
  isChecked: false,
  isLinkedWithExternal: undefined,
  defaultVariantId: 0,
  isNotice: false,
  isReset: 0,
  listVariantsSelect: [],
};

export const newProductReducer = createSlice({
  name: 'newProduct',
  initialState,
  reducers: {
    setPopupVariant(state, action: PayloadAction<boolean>) {
      state.isPopupVariant = action.payload;
    },
    setAddVariantId(state, action: PayloadAction<number[]>) {
      state.variantId = action.payload;
    },
    setAddVariantIdBackup(state, action: PayloadAction<number[]>) {
      state.variantIdBackup = action.payload;
    },
    setChecked(state, action: PayloadAction<boolean>) {
      state.isChecked = action.payload;
    },
    setDefaultId(state) {
      state.variantId = [];
    },
    setLinkedWithExternal(state, action: PayloadAction<boolean>) {
      state.isLinkedWithExternal = action.payload;
    },
    setDefaultVariantId(state, action: PayloadAction<number>) {
      state.defaultVariantId = action.payload;
    },
    setNotice(state, action: PayloadAction<boolean>) {
      state.isNotice = action.payload;
    },
    setReset(state, action: PayloadAction<number>) {
      state.isReset = action.payload;
    },
    setListVariantSelect(state, action: PayloadAction<Variant[]>) {
      state.listVariantsSelect = action.payload;
    },
  },
});

export const {
  setPopupVariant,
  setAddVariantId,
  setAddVariantIdBackup,
  setChecked,
  setDefaultId,
  setLinkedWithExternal,
  setDefaultVariantId,
  setNotice,
  setReset,
  setListVariantSelect,
} = newProductReducer.actions;

export const showPopupVariant = (state: RootState) => state.newProduct.isPopupVariant;
export const addVariantId = (state: RootState) => state.newProduct.variantId;
export const addVariantIdBackup = (state: RootState) => state.newProduct.variantId;
export const checked = (state: RootState) => state.newProduct.isChecked;
export const linkedWithExternal = (state: RootState) =>
  state.newProduct.isLinkedWithExternal;
export const defaultVariantId = (state: RootState) => state.newProduct.defaultVariantId;
export const notice = (state: RootState) => state.newProduct.isNotice;
export const noticeReset = (state: RootState) => state.newProduct.isReset;
export const listVariantsSelect = (state: RootState) =>
  state.newProduct.listVariantsSelect;

export default newProductReducer.reducer;
