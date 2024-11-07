import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../common/redux/store';
import { DetailPropsSlice } from './interface';

const initialState: DetailPropsSlice = {
  attributeTermButton: 'left',
  idVariant: 0,
  showDataVariant: false,
  pressToggle: false,
};

export const detailProductReducer = createSlice({
  name: 'detailProduct',
  initialState,
  reducers: {
    setAttributeTermButton: (state, action: PayloadAction<string | null>) => {
      state.attributeTermButton = action.payload;
    },
    setIdVariant: (state, action: PayloadAction<number>) => {
      state.idVariant = action.payload;
    },
    setShowDataVariant: (state, action: PayloadAction<boolean>) => {
      state.showDataVariant = action.payload;
    },
    setOnPressToggle: (state, action: PayloadAction<boolean>) => {
      state.pressToggle = action.payload;
    },
  },
});

export const {
  setAttributeTermButton,
  setIdVariant,
  setShowDataVariant,
  setOnPressToggle,
} = detailProductReducer.actions;

export const toggleAttributeButton = (state: RootState) =>
  state.detailProduct.attributeTermButton;
export const idProductVariant = (state: RootState) => state.detailProduct.idVariant;
export const showVariant = (state: RootState) => state.detailProduct.showDataVariant;
export const onPressToggle = (state: RootState) => state.detailProduct.pressToggle;

export default detailProductReducer.reducer;
