import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/common/redux/store';

type StateProps = {
  isOpenConfirmModal: boolean;
  selectedRow: number[];
};

const initialState: StateProps = {
  isOpenConfirmModal: false,
  selectedRow: [],
};

export const categoryManageSlice = createSlice({
  name: 'categoryManage',
  initialState,
  reducers: {
    setIsOpenConfirmModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenConfirmModal = action.payload;
    },
    setSelectedRow: (state, action: PayloadAction<number[]>) => {
      state.selectedRow = action.payload;
    },
  },
});

export const { setIsOpenConfirmModal, setSelectedRow } = categoryManageSlice.actions;

export const isOpenConfirmModalSelector = (state: RootState) =>
  state.categoryManage.isOpenConfirmModal;
export const selectedIdsSelector = (state: RootState) => state.categoryManage.selectedRow;

export default categoryManageSlice.reducer;
