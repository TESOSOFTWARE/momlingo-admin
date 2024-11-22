import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../common/redux/store';
import { IParamsRefundedOrderRequest } from './interfaces';
const initialState: StateProps = {
  isOpenConfirmModal: false,
  paramsRefundRequest: {
    page: 0,
    limit: 0,
    orderRefundStatus: '',
  },
  reject: false,
};

type StateProps = {
  isOpenConfirmModal: boolean;
  paramsRefundRequest: IParamsRefundedOrderRequest;
  reject: boolean;
};
export const requestRefundReducer = createSlice({
  name: 'requestRefund',
  initialState: initialState,
  reducers: {
    setIsOpenConfirmModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenConfirmModal = action.payload;
    },
    setParamsRefundRequest: (
      state,
      action: PayloadAction<StateProps['paramsRefundRequest']>
    ) => {
      state.paramsRefundRequest = action.payload;
    },
    setReject: (state, action: PayloadAction<boolean>) => {
      state.reject = action.payload;
    },
  },
});
export const { setIsOpenConfirmModal, setParamsRefundRequest, setReject } =
  requestRefundReducer.actions;

export default requestRefundReducer.reducer;
