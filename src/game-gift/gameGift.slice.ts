import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/common/redux/store';

type StateProps = {
  isOpenConfirmModal: boolean;
  selectedRow: number[];
  idProduct: number;
};

const initialState: StateProps = {
  isOpenConfirmModal: false,
  selectedRow: [],
  idProduct: 0,
};

export const gameGiftManageSlice = createSlice({
  name: 'gameGiftManage',
  initialState,
  reducers: {
    setIsOpenConfirmModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenConfirmModal = action.payload;
    },
    setSelectedRow: (state, action: PayloadAction<number[]>) => {
      state.selectedRow = action.payload;
    },
    setIdProduct: (state, action: PayloadAction<number>) => {
      state.idProduct = action.payload;
    },
  },
});

export const { setIsOpenConfirmModal, setSelectedRow, setIdProduct } = gameGiftManageSlice.actions;

export const isOpenConfirmModalSelector = (state: RootState) =>
  state.gameGiftManage.isOpenConfirmModal;
export const selectedIdsSelector = (state: RootState) => state.gameGiftManage.selectedRow;
export const idProductSelector = (state: RootState) => state.gameGiftManage.idProduct;

export default gameGiftManageSlice.reducer;
