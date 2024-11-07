import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/common/redux/store';
import { IProductListStateProps } from './interface/interface';

const ProductAttributeState: IProductListStateProps = {
  confirmPopup: false,
  selectIdsAttribute: [],
};
export const productAttributeSlice = createSlice({
  name: 'product-attribute',
  initialState: ProductAttributeState,
  reducers: {
    setConfirmPopup: (state, action: PayloadAction<boolean>) => {
      state.confirmPopup = action.payload;
    },

    setSelectIdsAttribute: (state, action: PayloadAction<number[]>) => {
      state.selectIdsAttribute = action.payload;
    },
  },
});
export const { setConfirmPopup, setSelectIdsAttribute } = productAttributeSlice.actions;

export const confirmPopupAttState = (state: RootState) =>
  state.productAttribute.confirmPopup;
export const setSelectIdsAttState = (state: RootState) =>
  state.productAttribute.selectIdsAttribute;

export default productAttributeSlice.reducer;
