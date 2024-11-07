import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/common/redux/store';
import { IParamsStatisticScan, IProvince } from './interfaces';
import { stat } from 'fs';

type StateProps = {
  searchData: IParamsStatisticScan;
  province: IProvince[];
  isOpenConfirmModalSelector: boolean;
};

const initialState: StateProps = {
  searchData: {
    startDate: null,
    endDate: null,
    provinceKeys: ['ALL', 'UNKNOWN'],
  },
  province: [],
  isOpenConfirmModalSelector: false,
};

export const statisticScanSlice = createSlice({
  name: 'statisticScan',
  initialState,
  reducers: {
    setSearchData: (state, action: PayloadAction<IParamsStatisticScan>) => {
      state.searchData = action.payload;
    },
    setProvincePicked: (state, action: PayloadAction<IProvince[]>) => {
      state.province = action.payload;
    },
    setIsOpenConfirmModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenConfirmModalSelector = action.payload;
    },
  },
});

export const { setSearchData, setProvincePicked, setIsOpenConfirmModal } =
  statisticScanSlice.actions;

export const searchDataSelector = (state: RootState) => state.statisticScan.searchData;
export const provincePickedSelector = (state: RootState) => state.statisticScan.province;

export default statisticScanSlice.reducer;
