import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../common/redux/store';
import { IPropsTermSlice } from '../term-list/interface';

const initialState: IPropsTermSlice = {
  showToggled: false,
};

export const editAttributeTermReducer = createSlice({
  name: 'editAttributeTerm',
  initialState,
  reducers: {
    setToggled(state, action: PayloadAction<boolean>) {
      state.showToggled = action.payload;
    },
  },
});

export const { setToggled } = editAttributeTermReducer.actions;

export const isToggled = (state: RootState) => state.editAttributeTerm.showToggled;

export default editAttributeTermReducer.reducer;
