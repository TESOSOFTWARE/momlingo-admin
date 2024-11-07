import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateProps } from './interface';

const initialState: StateProps = {
  confirmModal: {
    callback: () => {},
    isOpen: false,
    text: '',
  },
};

export const popupSlice = createSlice({
  name: 'popup',
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
  },
});

export const { setConfirmModal, closeConfirmModal } = popupSlice.actions;

export default popupSlice.reducer;
