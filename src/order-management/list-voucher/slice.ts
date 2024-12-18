import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../common/redux/store';
import { defaultValueFilter } from './constant';
import { InitialOrderState, IOrderParams } from './interface';

const initialOrderState: InitialOrderState = {
  dataSearch: defaultValueFilter,
  value: 0,
};

export const listVoucherReducer = createSlice({
  name: 'listVoucher',
  initialState: initialOrderState,
  reducers: {
    setDataFilter(state, action: PayloadAction<IOrderParams>) {
      state.dataSearch = action.payload;
    },
    setValue(state, action: PayloadAction<number>) {
      state.value = action.payload;
    },
  },
});

export const { setDataFilter, setValue } = listVoucherReducer.actions;

export const dataFilter = (state: RootState) => state.listVoucher.dataSearch;
export const numberValue = (state: RootState) => state.listVoucher.value;

export default listVoucherReducer.reducer;
