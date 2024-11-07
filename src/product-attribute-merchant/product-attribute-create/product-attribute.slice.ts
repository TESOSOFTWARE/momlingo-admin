import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/common/redux/store';
import { dataPostProductDefault, langs } from './constants/constants';
import {
  IFormCreateProduct,
  IPostProductStateProps,
  ISelectedLang,
} from './interface/interface';

const initialState: IPostProductStateProps = {
  isPopup: false,
  dataPostProduct: dataPostProductDefault,
  selectedLang: langs.VN,
};

export const postProductAttributeSlice = createSlice({
  name: 'post-product-attribute',
  initialState,
  reducers: {
    setDataPostProduct: (state, action: PayloadAction<IFormCreateProduct>) => {
      state.dataPostProduct = action.payload;
    },
    setPopup: (state, action: PayloadAction<boolean>) => {
      state.isPopup = action.payload;
    },
    setSelectedLang: (state, action: ISelectedLang) => {
      state.selectedLang = action.payload;
    },
  },
});

export const { setDataPostProduct, setPopup, setSelectedLang } =
  postProductAttributeSlice.actions;

export const setDatePostProductState = (state: RootState) =>
  state.postProductAttribute.dataPostProduct;
export const setPopupState = (state: RootState) => state.postProductAttribute.isPopup;
export const setSelectedLangState = (state: RootState) =>
  state.postProductAttribute.selectedLang;
export default postProductAttributeSlice.reducer;
