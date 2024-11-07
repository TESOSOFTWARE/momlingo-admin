import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/common/redux/store';
import { IParamsStatisticPoint } from './interfaces';

type StateProps = {
  searchData: IParamsStatisticPoint;
};

const initialState: StateProps = {
  searchData:{
    startDate: null,
    endDate: null,
  }
};

export const statisticPointSlice = createSlice({
  name: 'statisticPoint',
  initialState,
  reducers: {
    setSearchData: (state, action: PayloadAction<IParamsStatisticPoint>) => {
      state.searchData = action.payload;
    },
  },
});

export const { setSearchData } = statisticPointSlice.actions;

export const searchDataSelector = (state: RootState) => state.statisticPoint.searchData;

export default statisticPointSlice.reducer;
