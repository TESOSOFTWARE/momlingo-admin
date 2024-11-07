import { IPoint } from '../../config-point/list-point/interface';
import { StateProps } from './interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: StateProps = {
  gameSelected: '',
  searchText: '',
  searchProductGroupText: '',
  confirmModal: {
    callback: () => {},
    isOpen: false,
    text: '',
  },
};

export const configPlayTime = createSlice({
  name: 'config-play-time',
  initialState,
  reducers: {
    setGameSelected: (state, action: PayloadAction<string>) => {
      state.gameSelected = action.payload;
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
    setSearchGameId: (state, action: PayloadAction<number>) => {
      state.searchGameId = action.payload;
    },
    setSearchProductGroupText: (state, action: PayloadAction<string>) => {
      state.searchProductGroupText = action.payload;
    },
  },
});

export const {
  setGameSelected,
  setConfirmModal,
  closeConfirmModal,
  setSearchText,
  setSearchGameId,
  setSearchProductGroupText,
} = configPlayTime.actions;

export default configPlayTime.reducer;
