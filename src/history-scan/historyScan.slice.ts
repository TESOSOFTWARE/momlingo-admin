import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/common/redux/store';
import { IListHistoryScanParams, IParamsDuplicateScan } from './interfaces';
import {
  DEFAULT_VALUES_FILTER_DUPLICATE_SCAN,
  DEFAULT_VALUES_FILTER_HISTORY_SCAN,
} from './constants';

type StateProps = {
  searchForm: IListHistoryScanParams;
  isOpenModalActiveDuplicate: boolean;
  idPicked: number;
  searchDuplicateCode: IParamsDuplicateScan;
  unBlockRow: boolean;
  confirmModal: {
    callback: VoidFunction;
    isOpen: boolean;
    text: string;
  };
};

const initialState: StateProps = {
  searchForm: DEFAULT_VALUES_FILTER_HISTORY_SCAN,
  isOpenModalActiveDuplicate: false,
  idPicked: 0,
  searchDuplicateCode: DEFAULT_VALUES_FILTER_DUPLICATE_SCAN,
  unBlockRow: false,
  confirmModal: {
    callback: () => {},
    isOpen: false,
    text: '',
  },
};

export const historyScanSlice = createSlice({
  name: 'historyScanManage',
  initialState,
  reducers: {
    setSearchForm: (state, action: PayloadAction<IListHistoryScanParams>) => {
      state.searchForm = action.payload;
    },
    setIsOpenModalActiveDuplicate: (state, action: PayloadAction<boolean>) => {
      state.isOpenModalActiveDuplicate = action.payload;
    },
    setIdPicked: (state, action: PayloadAction<number>) => {
      state.idPicked = action.payload;
    },
    setSearchDuplicateCode: (state, action: PayloadAction<IParamsDuplicateScan>) => {
      state.searchDuplicateCode = action.payload;
    },
    setUnBlock: (state, action: PayloadAction<boolean>) => {
      state.unBlockRow = action.payload;
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
  },
});

export const {
  setSearchForm,
  setIsOpenModalActiveDuplicate,
  setIdPicked,
  setSearchDuplicateCode,
  setUnBlock,
  setConfirmModal,
  closeConfirmModal,
} = historyScanSlice.actions;

export const searchFormSelector = (state: RootState) => state.historyScan.searchForm;
export const searchDuplicateSelector = (state: RootState) =>
  state.historyScan.searchDuplicateCode;

export const isOpenActiveDuplicateSelector = (state: RootState) =>
  state.historyScan.isOpenModalActiveDuplicate;
export const idPickedSelector = (state: RootState) => state.historyScan.idPicked;
export const unBlockSelector = (state: RootState) => state.historyScan.unBlockRow;

export default historyScanSlice.reducer;
