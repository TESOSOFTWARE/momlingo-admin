import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../common/redux/store';
import { IPropsTermSlice } from './interface';

const initialState: IPropsTermSlice = {
  showToggled: false,
};

export const newAttributeTermReducer = createSlice({
  name: 'newAttributeTerm',
  initialState,
  reducers: {
    setToggled(state, action: PayloadAction<boolean>) {
      state.showToggled = action.payload;
    },
  },
});

export const { setToggled } = newAttributeTermReducer.actions;

export const isToggled = (state: RootState) => state.newAttributeTerm.showToggled;

export default newAttributeTermReducer.reducer;
