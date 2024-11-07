import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../../../common/redux/store';
import { defaultValueFilter } from './constants';
import { IHistoryGiftUserParams, InitialHistoryGiftUserState } from './interfaces';

const initialOrderState: InitialHistoryGiftUserState = {
  dataSearch: defaultValueFilter,
  value: 0
};

export const historyGiftReducer = createSlice({
  name: 'historyGift',
  initialState: initialOrderState,
  reducers: {
    setDataFilter(state, action: PayloadAction<IHistoryGiftUserParams>) {
      state.dataSearch = action.payload;
    },
    setValue(state, action: PayloadAction<number>) {
      state.value = action.payload;
    }
  }
});

export const { setDataFilter, setValue } = historyGiftReducer.actions;

export const dataFilter = (state: RootState) => state.historyGift.dataSearch;
export const numberValue = (state: RootState) => state.historyGift.value;

export default historyGiftReducer.reducer;
