import { StateProps } from './interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: StateProps = {
  termPolicySelected: '',
  searchText: '',
  confirmModal: {
    callback: () => {},
    isOpen: false,
    text: '',
  },
};

export const termPolicySlice = createSlice({
  name: 'termPolicy',
  initialState,
  reducers: {
    setTermPolicySelected: (state, action: PayloadAction<string>) => {
      state.termPolicySelected = action.payload;
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
    setSearchStatus: (state, action: PayloadAction<string>) => {
      state.searchStatus = action.payload;
    },
  },
});

export const {
  setTermPolicySelected,
  setConfirmModal,
  closeConfirmModal,
  setSearchText,
  setSearchType,
  setSearchStatus,
} = termPolicySlice.actions;

export default termPolicySlice.reducer;
