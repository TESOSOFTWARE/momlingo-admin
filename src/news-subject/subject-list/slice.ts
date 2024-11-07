import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../common/redux/store';
import { InitialState } from './interface';

const initialState: InitialState = {
  value: 0,
  idDeleteNews: [],
  showPopup: false,
};

export const listNewsSubjectReducer = createSlice({
  name: 'listNewsSubject',
  initialState: initialState,
  reducers: {
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

export const { setValue, setIdDelete, setPopup } = listNewsSubjectReducer.actions;

export const numberValue = (state: RootState) => state.listNewsSubject.value;
export const listIdDelete = (state: RootState) => state.listNewsSubject.idDeleteNews;
export const isPopup = (state: RootState) => state.listNewsSubject.showPopup;

export default listNewsSubjectReducer.reducer;
