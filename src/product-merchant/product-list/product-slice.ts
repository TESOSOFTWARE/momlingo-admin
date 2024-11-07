import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../common/redux/store';
import { InitialProductState, IProductParams } from './product-interface';

const initialProductState: InitialProductState = {
  idDeleteProduct: [],
  showPopup: false,
  filterProduct: {},
};

export const listProductReducer = createSlice({
  name: 'listProduct',
  initialState: initialProductState,
  reducers: {
    setIdDelete(state, action: PayloadAction<number[]>) {
      state.idDeleteProduct = action.payload;
    },
    setPopup(state, action: PayloadAction<boolean>) {
      state.showPopup = action.payload;
    },
    setDataFilter(state, action: PayloadAction<IProductParams>) {
      state.filterProduct = action.payload;
    },
  },
});

export const { setIdDelete, setPopup, setDataFilter } = listProductReducer.actions;

export const listIdDelete = (state: RootState) => state.listProduct.idDeleteProduct;
export const isPopup = (state: RootState) => state.listProduct.showPopup;
export const dataFilter = (state: RootState) => state.listProduct.filterProduct;

export default listProductReducer.reducer;
