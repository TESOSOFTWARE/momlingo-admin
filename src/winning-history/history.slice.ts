import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/common/redux/store';
import { StateProps } from './interface';

const initialState: StateProps = {
  textSearch: '',
  filterOption: 'PHONE_NUMBER',
};

export const historySlice = createSlice({
  name: 'winning_history',
  initialState,
  reducers: {
    setTextSearch: (state, action: PayloadAction<string>) => {
      state.textSearch = action.payload;
    },
    setFilterOption: (state, action: PayloadAction<string>) => {
      state.filterOption = action.payload;
    },
  },
});

export const { setTextSearch, setFilterOption } = historySlice.actions;

export default historySlice.reducer;
