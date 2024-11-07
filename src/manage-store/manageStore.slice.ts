import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../common/redux/store';
import { string } from 'yup';
import { ICustomParams } from './interfaces';

type StateProps = {
  confirmDeleteModalStatus: boolean;
  filterListParams: {
    from?: string | null;
    to?: string | null;
    name?: string | null;
    phoneNumber?: string | null;
  };
  modeAction: string;
  confirmModal: {
    callback: VoidFunction;
    isOpen: boolean;
    text: string;
  };

  idPicked: number;
};

const initialState: StateProps = {
  confirmDeleteModalStatus: false,
  filterListParams: {
    from: '',
    to: '',
    name: '',
    phoneNumber: '',
  },

  modeAction: '',
  confirmModal: {
    callback: () => {},
    isOpen: false,
    text: '',
  },
  idPicked: 0,
};

export const manageStoreSlice = createSlice({
  name: 'manageStore',
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
    setConfirmDeleteModalStatus: (state, action: PayloadAction<boolean>) => {
      state.confirmDeleteModalStatus = action.payload;
    },
    setFilterListParams: (
      state,
      action: PayloadAction<StateProps['filterListParams']>
    ) => {
      state.filterListParams = action.payload;
    },
    setModeAction: (state, action: PayloadAction<string>) => {
      state.modeAction = action.payload;
    },
    setIdPicked: (state, action: PayloadAction<number>) => {
      state.idPicked = action.payload;
    },
  },
});

export const {
  closeConfirmModal,
  setConfirmModal,
  setConfirmDeleteModalStatus,
  setFilterListParams,
  setModeAction,
  setIdPicked,
} = manageStoreSlice.actions;

export const idPickedSelector = (state: RootState) => state.manageStore.idPicked;

export default manageStoreSlice.reducer;
