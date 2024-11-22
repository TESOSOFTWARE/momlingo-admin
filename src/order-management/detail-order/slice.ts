import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../common/redux/store';
import { defaultDelivery } from './constant';
import { StateProps, IOrderDelivery } from './interface';
import { EnumType } from '../common/interface';

const initialState: StateProps = {
  orderDelivery: defaultDelivery,
  isPopup: false,
  dataDelivery: defaultDelivery,
  checkType: EnumType.PHYSICAL,
  isOpenModalRefund: false,
};

export const detailOrderReducer = createSlice({
  name: 'detailOrder',
  initialState,
  reducers: {
    setOrderDelivery: (state, action: PayloadAction<StateProps['orderDelivery']>) => {
      state.orderDelivery = action.payload;
    },
    setShowPopup: (state, action: PayloadAction<boolean>) => {
      state.isPopup = action.payload;
    },
    setDataDelivery: (state, action: PayloadAction<IOrderDelivery>) => {
      state.dataDelivery = action.payload;
    },
    setCheckType: (state, action: PayloadAction<EnumType>) => {
      state.checkType = action.payload;
    },
    setIsOpenModalRefund: (state, action: PayloadAction<boolean>) => {
      state.isOpenModalRefund = action.payload;
    },
  },
});

export const {
  setOrderDelivery,
  setShowPopup,
  setDataDelivery,
  setCheckType,
  setIsOpenModalRefund,
} = detailOrderReducer.actions;
export const isShowPopup = (state: RootState) => state.detailOrder.isPopup;
export const orderDelivery = (state: RootState) => state.detailOrder.orderDelivery;
export const dataDelivery = (state: RootState) => state.detailOrder.dataDelivery;
export const checkType = (state: RootState) => state.detailOrder.checkType;
export const isOpenModalRefundSelector = (state: RootState) =>
  state.detailOrder.isOpenModalRefund;

export default detailOrderReducer.reducer;
