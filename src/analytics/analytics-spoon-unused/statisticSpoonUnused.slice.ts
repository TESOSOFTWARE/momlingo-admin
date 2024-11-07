import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/common/redux/store';
import { IParamsStatisticSpoon } from './interfaces';

type StateProps = {
  searchData: IParamsStatisticSpoon;
  isOpenConfirmModal: boolean;
};

const initialState: StateProps = {
  searchData: {
    startDate: null,
    endDate: null,
  },
  isOpenConfirmModal: false,
};

export const statisticSpoonUnusedSlice = createSlice({
  name: 'statisticSpoonUnused',
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

export const { setSearchData, setIsOpenConfirmModal } = statisticSpoonUnusedSlice.actions;

export const searchDataSelector = (state: RootState) =>
  state.statisticSpoonUnused.searchData;
export const isOpenConfirmModalSelector = (state: RootState) =>
  state.statisticSpoonUnused.isOpenConfirmModal;

export default statisticSpoonUnusedSlice.reducer;
