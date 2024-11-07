import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../common/redux/store';
import { defaultValueFilter } from './constant';
import { InitialState, IParamsListHistory } from './interface';

const initialState: InitialState = {
  dataSearch: defaultValueFilter,
  isOpenModalRequestExport: false,
};

export const listGameWinHistoryReducer = createSlice({
  name: 'listGameWinHistory',
  initialState: initialState,
  reducers: {
    setDataFilter(state, action: PayloadAction<IParamsListHistory>) {
      state.dataSearch = action.payload;
    },
    setIsOpenModalRequestExport: (state, action: PayloadAction<boolean>) => {
      state.isOpenModalRequestExport = action.payload;
    },
  },
});

export const { setDataFilter, setIsOpenModalRequestExport } =
  listGameWinHistoryReducer.actions;

export const dataFilter = (state: RootState) => state.listGameWinHistory.dataSearch;
export const isOpenModalExport = (state: RootState) =>
  state.listGameWinHistory.isOpenModalRequestExport;

export default listGameWinHistoryReducer.reducer;
