import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../common/redux/store';
import { IListStateProps } from './interface';

const listTermState: IListStateProps = {
  isPopup: false,
  selectId: [],
};
export const listTermReducer = createSlice({
  name: 'list-term',
  initialState: listTermState,
  reducers: {
    setIsPopup: (state, action: PayloadAction<boolean>) => {
      state.isPopup = action.payload;
    },
    setSelectId: (state, action: PayloadAction<number[]>) => {
      state.selectId = action.payload;
    },
  },
});
export const { setIsPopup, setSelectId } = listTermReducer.actions;

export const isPopup = (state: RootState) => state.listTerm.isPopup;
export const selectId = (state: RootState) => state.listTerm.selectId;

export default listTermReducer.reducer;
