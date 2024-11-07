import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'src/common/redux/store';

type StateProps = {
  showPassword: boolean;
};
const initialState: StateProps = {
  showPassword: false,
};
export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setShowPassword: (state, action) => {
      state.showPassword = action.payload;
    },
  },
});

export const { setShowPassword } = registerSlice.actions;

export const showPasswordSelector = (state: RootState) => state.register.showPassword;

export default registerSlice.reducer;
