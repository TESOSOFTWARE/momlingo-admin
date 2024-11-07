import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../common/redux/store';
import { IListStateProps } from './interface';

const listVariantState: IListStateProps = {
  isPopup: false,
  selectId: [],
};
export const listVariantReducer = createSlice({
  name: 'list-variant',
  initialState: listVariantState,
  reducers: {
    setIsPopup: (state, action: PayloadAction<boolean>) => {
      state.isPopup = action.payload;
    },
    setSelectId: (state, action: PayloadAction<number[]>) => {
      state.selectId = action.payload;
    },
  },
});
export const { setIsPopup, setSelectId } = listVariantReducer.actions;

export const isPopup = (state: RootState) => state.listVariant.isPopup;
export const selectId = (state: RootState) => state.listVariant.selectId;

export default listVariantReducer.reducer;
