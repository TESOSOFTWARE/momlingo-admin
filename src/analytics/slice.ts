import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateProps } from './interface';

const initialState: StateProps = {
  searchParams: {
    startDate: undefined,
    endDate: undefined,
  },
  searchParamsGame: {
    startDate: undefined,
    endDate: undefined,
  },
  confirmModal: {
    callback: () => {},
    isOpen: false,
    text: '',
  },
};

export const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    setConfirmModal: (state, action: PayloadAction<StateProps['confirmModal']>) => {
      state.confirmModal = action.payload;
    },
    closeConfirmModal: (state) => {
      state.confirmModal = {
        callback: () => {},
        isOpen: false,
        text: '',
      };
    },
    setSearchParams: (state, action: PayloadAction<StateProps['searchParams']>) => {
      state.searchParams = action.payload;
    },
    setSearchParamsGame: (state, action: PayloadAction<StateProps['searchParams']>) => {
      state.searchParamsGame = action.payload;
    },
  },
});

export const {
  setSearchParams,
  setConfirmModal,
  closeConfirmModal,
  setSearchParamsGame,
} = chartSlice.actions;

export default chartSlice.reducer;
