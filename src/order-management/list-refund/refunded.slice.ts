import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../common/redux/store';
import { ISearchRefundedOrder } from './interfaces';
import { DEFAULT_REFUND_FORM } from '../detail-order/constant';
import { DEFAULT_VALUE_SEARCH_REFUNDED_ORDER } from './constants';

type StateProps = {
  dataSearch: ISearchRefundedOrder;
  isOpenModalExport: boolean;
  redirectModal: {
    isOpen: boolean;
    text: string;
    callback: VoidFunction;
  };
};

const initialOrderState: StateProps = {
  dataSearch: {
    name: undefined,
    startDate: null,
    endDate: null,
    orderId: undefined,
    type: 'PHYSICAL',
  },
  isOpenModalExport: false,
  redirectModal: {
    isOpen: false,
    text: '',
    callback: () => {},
  },
};

export const listRefundedOrderReducer = createSlice({
  name: 'refundedOrder',
  initialState: initialOrderState,
  reducers: {
    setDataSearch(state, action: PayloadAction<ISearchRefundedOrder>) {
      state.dataSearch = action.payload;
    },
    setIsOpenModalExport(state, action: PayloadAction<boolean>) {
      state.isOpenModalExport = action.payload;
    },
    setOpenRedirectModal: (state, action: PayloadAction<StateProps['redirectModal']>) => {
      state.redirectModal = action.payload;
    },
    setCloseRedirectModal: (state) => {
      state.redirectModal = {
        isOpen: false,
        text: '',
        callback: () => {},
      };
    },
  },
});

export const {
  setDataSearch,
  setIsOpenModalExport,
  setCloseRedirectModal,
  setOpenRedirectModal,
} = listRefundedOrderReducer.actions;

export const searchDataRefundedOrderSelector = (state: RootState) =>
  state.refundedOrder.dataSearch;
export const IsOpenModalExportSelector = (state: RootState) =>
  state.refundedOrder.isOpenModalExport;

export default listRefundedOrderReducer.reducer;
