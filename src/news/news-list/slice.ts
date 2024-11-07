import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../common/redux/store';
import { defaultValueFilter } from './constant';
import { InitialNewsState, INewsParams } from './interface';

const initialNewsState: InitialNewsState = {
  dataSearch: defaultValueFilter,
  value: 0,
  idDeleteNews: [],
  showPopup: false,
};

export const listNewsReducer = createSlice({
  name: 'listNews',
  initialState: initialNewsState,
  reducers: {
    setDataFilter(state, action: PayloadAction<INewsParams>) {
      state.dataSearch = action.payload;
    },
    setValue(state, action: PayloadAction<number>) {
      state.value = action.payload;
    },
    setIdDelete(state, action: PayloadAction<number[]>) {
      state.idDeleteNews = action.payload;
    },
    setPopup(state, action: PayloadAction<boolean>) {
      state.showPopup = action.payload;
    },
  },
});

export const { setDataFilter, setValue, setIdDelete, setPopup } = listNewsReducer.actions;

export const dataFilter = (state: RootState) => state.listNews.dataSearch;
export const numberValue = (state: RootState) => state.listNews.value;
export const listIdDelete = (state: RootState) => state.listNews.idDeleteNews;
export const isPopup = (state: RootState) => state.listNews.showPopup;

export default listNewsReducer.reducer;
