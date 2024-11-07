import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateProps } from './interface';

const initialState: StateProps = {
  searchParams:{
    phone:undefined,
    name:undefined,
    startDate:undefined,
    endDate:undefined,
    type:undefined,
  },
  confirmModal: {
    callback: () => { },
    isOpen: false,
    text: '',
  },
};

export const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    setConfirmModal: (state, action: PayloadAction<StateProps['confirmModal']>) => {
      state.confirmModal = action.payload;
    },
    closeConfirmModal: (state) => {
      state.confirmModal = {
        callback: () => { },
        isOpen: false,
        text: '',
      };
    },
    setSearchParams: (state, action: PayloadAction<StateProps['searchParams']>) => {
      state.searchParams = action.payload;
    },
  },
});

export const {setConfirmModal, closeConfirmModal, setSearchParams } = feedbackSlice.actions;

export default feedbackSlice.reducer;
