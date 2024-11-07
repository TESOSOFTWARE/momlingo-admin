import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/common/redux/store';

type StateProps = {
  weightParams: number | null;
  productGroupParams: string;
  quantity: string;
  isPopup: boolean;
  passWord: string;
  isSetPassword: boolean;
  isOpenEditSpoonCode: boolean;
  limitSpoonCode: number;
};

const initialState: StateProps = {
  weightParams: null,
  productGroupParams: '',
  quantity: '',
  isPopup: false,
  passWord: '',
  isSetPassword: false,
  isOpenEditSpoonCode: false,
  limitSpoonCode: 0,
};

export const requestManageSlice = createSlice({
  name: 'requestManage',
  initialState,
  reducers: {
    setWeightParams: (state, action: PayloadAction<number>) => {
      state.weightParams = action.payload;
    },
    setProductGroupParams: (state, action: PayloadAction<string>) => {
      state.productGroupParams = action.payload;
    },
    setQuantitySpoon: (state, action: PayloadAction<string>) => {
      state.quantity = action.payload;
    },
    setPopup: (state, action: PayloadAction<boolean>) => {
      state.isPopup = action.payload;
    },
    setPassWord: (state, action: PayloadAction<string>) => {
      state.passWord = action.payload;
    },
    setIsSetPassword: (state, action: PayloadAction<boolean>) => {
      state.isSetPassword = action.payload;
    },
    setLimitSpoonCode: (state, action: PayloadAction<number>) => {
      state.limitSpoonCode = action.payload;
    },
    setIsOpenEditSpoonCode: (state, action: PayloadAction<boolean>) => {
      state.isOpenEditSpoonCode = action.payload;
    },
  },
});

export const {
  setWeightParams,
  setProductGroupParams,
  setQuantitySpoon,
  setPopup,
  setLimitSpoonCode,
  setIsOpenEditSpoonCode,
  setPassWord,
  setIsSetPassword,
} = requestManageSlice.actions;

export const weightParamsSelector = (state: RootState) =>
  state.requestManage.weightParams;
export const productGroupParamsSelector = (state: RootState) =>
  state.requestManage.productGroupParams;
export const quantitySpoonSelector = (state: RootState) => state.requestManage.quantity;
export const isPopup = (state: RootState) => state.requestManage.isPopup;
export const dataPassWord = (state: RootState) => state.requestManage.passWord;
export const isSetPassword = (state: RootState) => state.requestManage.isSetPassword;
export const limitSpoonCode = (state: RootState) => state.requestManage.limitSpoonCode;
export const isOpenEditSpoonCode = (state: RootState) =>
  state.requestManage.isOpenEditSpoonCode;
export default requestManageSlice.reducer;
