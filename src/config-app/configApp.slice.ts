import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/common/redux/store';
import { IConfigApp } from './interfaces';

type StateProps = {
  isOpenModal: boolean;
  pickedRow: IConfigApp;
};

const initialState: StateProps = {
  isOpenModal: false,
  pickedRow: {
    id: 0,
    deviceType: '',
    mobileVersion: 0,
  },
};

export const configAppSlice = createSlice({
  name: 'configApp',
  initialState,
  reducers: {
    setIsOpenModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenModal = action.payload;
    },
    setPickedRow: (state, action: PayloadAction<IConfigApp>) => {
      state.pickedRow = action.payload;
    },
  },
});

export const { setIsOpenModal, setPickedRow } = configAppSlice.actions;

export const isOpenModalSelector = (state: RootState) => state.configApp.isOpenModal;
export const pickedRowSelector = (state: RootState) => state.configApp.pickedRow;

export default configAppSlice.reducer;
