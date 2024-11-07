import { StateProps } from './interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/common/redux/store';

const initialState: StateProps = {
  giftSelected: '',
  searchText: '',
  searchType: 'GIFT_NAME',
  confirmModal: {
    callback: () => {},
    isOpen: false,
    text: '',
  },
};

export const giftSlice = createSlice({
  name: 'gift',
  initialState,
  reducers: {
    setGiftSelected: (state, action: PayloadAction<string>) => {
      state.giftSelected = action.payload;
    },
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
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    setSearchType: (state, action: PayloadAction<string>) => {
      state.searchType = action.payload;
    },
  },
});

export const {
  setGiftSelected,
  setConfirmModal,
  closeConfirmModal,
  setSearchText,
  setSearchType,
} = giftSlice.actions;

export default giftSlice.reducer;
