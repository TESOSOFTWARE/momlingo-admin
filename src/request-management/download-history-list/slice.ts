import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/common/redux/store';
import { defaultValueSearch } from './constants';
import { ISearchRequest, ISliceForm } from './interface';

const initialState: ISliceForm = {
  searchForm: defaultValueSearch,
};

export const DownloadHistoryListSlice = createSlice({
  name: 'listRequest',
  initialState,
  reducers: {
    setSearchForm: (state, action: PayloadAction<ISearchRequest>) => {
      state.searchForm = action.payload;
    },
  },
});

export const { setSearchForm } = DownloadHistoryListSlice.actions;
export const dataSearch = (state: RootState) => state.downloadHistory.searchForm;
export default DownloadHistoryListSlice.reducer;
