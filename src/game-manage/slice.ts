import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateProps } from './interface';

const initialState: StateProps = {
  searchForm: '',
  confirmModal: {
    callback: () => { },
    isOpen: false,
    text: '',
  },
};

export const tierRankSlice = createSlice({
  name: 'tierRank',
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
    setSearchForm: (state, action: PayloadAction<string>) => {
      state.searchForm = action.payload;

    }
  },
});

export const { setConfirmModal, closeConfirmModal, setSearchForm } = tierRankSlice.actions;

export default tierRankSlice.reducer;
