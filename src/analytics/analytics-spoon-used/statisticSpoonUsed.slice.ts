import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/common/redux/store';
import { IParamsStatisticSpoon } from './interfaces';

type StateProps = {
  searchData: IParamsStatisticSpoon;
  isOpenConfirmModal: boolean;
};

const initialState: StateProps = {
  searchData: {
    status: '',
    startDate: null,
    endDate: null,
  },
  isOpenConfirmModal: false,
};

export const statisticSpoonUsedSlice = createSlice({
  name: 'statisticSpoonUsed',
  initialState,
  reducers: {
    setSearchData: (state, action: PayloadAction<IParamsStatisticSpoon>) => {
      state.searchData = action.payload;
    },
    setIsOpenConfirmModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenConfirmModal = action.payload;
    },
  },
});

export const { setSearchData, setIsOpenConfirmModal } = statisticSpoonUsedSlice.actions;

export const searchDataSelector = (state: RootState) =>
  state.statisticSpoonUsed.searchData;
export const isOpenConfirmModalSelector = (state: RootState) =>
  state.statisticSpoonUsed.isOpenConfirmModal;

export default statisticSpoonUsedSlice.reducer;
