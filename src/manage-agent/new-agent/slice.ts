import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../common/redux/store';
import { INewAgentSlice } from './interface';

const initialState: INewAgentSlice = {
  showPassword: false,
  confirmPassword: false,
};
export const newAgentReducer = createSlice({
  name: 'newAgent',
  initialState,
  reducers: {
    setShowPassword: (state, action: PayloadAction<boolean>) => {
      state.showPassword = action.payload;
    },
    setShowConfirmPassword: (state, action: PayloadAction<boolean>) => {
      state.confirmPassword = action.payload;
    },
  },
});

export const { setShowPassword, setShowConfirmPassword } = newAgentReducer.actions;

export const isShowPassword = (state: RootState) => state.newAgent.showPassword;
export const isConfirmPassword = (state: RootState) => state.newAgent.confirmPassword;

export default newAgentReducer.reducer;
