import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateProps } from './interface';
import { RootState } from '../common/redux/store';

const initialState: StateProps = {
  confirmModal: {
    callback: () => {},
    isOpen: false,
    text: '',
  },
  isOpenModal: false,
  selectedRowId: [],
  searchPoliciesText: '',
};

export const notiSlice = createSlice({
  name: 'noti',
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
    setSearchPoliciesText: (state, action: PayloadAction<string>) => {
      state.searchPoliciesText = action.payload;
    },
    setIsOpenModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenModal = action.payload;
    },
    setSelectedRowId: (state, action: PayloadAction<number[]>) => {
      state.selectedRowId = action.payload;
    },
  },
});

export const {
  setSearchPoliciesText,
  setConfirmModal,
  closeConfirmModal,
  setIsOpenModal,
  setSelectedRowId,
} = notiSlice.actions;

export const setIsOpenModalSelector = (state: RootState) => state.noti.isOpenModal;
export const setSelectedRowIdSelector = (state: RootState) => state.noti.selectedRowId;

export default notiSlice.reducer;
