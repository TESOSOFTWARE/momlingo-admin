import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/common/redux/store';
import {
  IListUserIntroduceParams,
  IParamsChangeBlockAccount,
  ISearchUser,
  ISearchUserIntroduced,
} from './interfaces';
import { DEFAULT_VALUE_SEARCH_INTRODUCE, DEFAULT_VALUE_SEARCH_USER } from './constants';

type StateProps = {
  searchForm: ISearchUser;
  isOpenModalAddPoint: boolean;
  rowItem: IParamsChangeBlockAccount;
  isOpenModalAccount: boolean;
  isOpenModalHistoryScan: boolean;
  isOpenModalHistoryGift: boolean;
  searchFormIntroduce: ISearchUserIntroduced;
  isOpenModalRequestExport: boolean;
  confirmModal: {
    callback: VoidFunction;
    isOpen: boolean;
    text: string;
  },
  filterParamsIntroduced:IListUserIntroduceParams;
};

const initialState: StateProps = {
  searchForm: DEFAULT_VALUE_SEARCH_USER,
  isOpenModalAddPoint: false,
  isOpenModalAccount: false,
  rowItem: {
    id: 0,
    blockAddPoint: false,
    phoneNumber: '',
    blockAccount: false,
  },
  isOpenModalHistoryScan: false,
  isOpenModalHistoryGift: false,
  searchFormIntroduce: DEFAULT_VALUE_SEARCH_INTRODUCE,
  isOpenModalRequestExport: false,
  confirmModal: {
    callback: () => { },
    isOpen: false,
    text: '',
  
  },
  filterParamsIntroduced:{
    referrerName:null,
    phoneNumber:null,
    minReferralDate:null,
    maxReferralDate:null,
    page:0,
    limit:0,
  }

};

export const userManageSlice = createSlice({
  name: 'userManage',
  initialState,
  reducers: {
    setSearchForm: (state, action: PayloadAction<ISearchUser>) => {
      state.searchForm = action.payload;
    },
    setFilterParamsIntroduced: (state, action: PayloadAction<IListUserIntroduceParams>) => {
      state.filterParamsIntroduced = action.payload;
    },
    setIsOpenModalAddPoint: (state, action: PayloadAction<boolean>) => {
      state.isOpenModalAddPoint = action.payload;
    },
    setIsOpenModalAccount: (state, action: PayloadAction<boolean>) => {
      state.isOpenModalAccount = action.payload;
    },
    setRowItem: (state, action: PayloadAction<IParamsChangeBlockAccount>) => {
      state.rowItem = action.payload;
    },
    setIsOpenModalHistoryScan: (state, action: PayloadAction<boolean>) => {
      state.isOpenModalHistoryScan = action.payload;
    },
    setIsOpenModalHistoryGift: (state, action: PayloadAction<boolean>) => {
      state.isOpenModalHistoryGift = action.payload;
    },
    setSearchFormIntroduce: (state, action: PayloadAction<ISearchUserIntroduced>) => {
      state.searchFormIntroduce = action.payload;
    },
    setIsOpenModalRequestExport: (state, action: PayloadAction<boolean>) => {
      state.isOpenModalRequestExport = action.payload;
    },
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
  },
});

export const {
  setFilterParamsIntroduced,
  closeConfirmModal,
  setConfirmModal,
  setSearchForm,
  setIsOpenModalAddPoint,
  setIsOpenModalAccount,
  setRowItem,
  setIsOpenModalHistoryScan,
  setIsOpenModalHistoryGift,
  setSearchFormIntroduce,
  setIsOpenModalRequestExport,
} = userManageSlice.actions;

export const searchFormSelector = (state: RootState) => state.userManage.searchForm;
export const isOpenModalAddPointSelector = (state: RootState) =>
  state.userManage.isOpenModalAddPoint;
export const isOpenModalAccountSelector = (state: RootState) =>
  state.userManage.isOpenModalAccount;

export const rowItemSelector = (state: RootState) => state.userManage.rowItem;

export const isOpenModalHistoryScanSelector = (state: RootState) =>
  state.userManage.isOpenModalHistoryScan;
export const isOpenModalHistoryGiftSelector = (state: RootState) =>
  state.userManage.isOpenModalHistoryGift;
export const searchFormIntroduceSelector = (state: RootState) =>
  state.userManage.searchFormIntroduce;
export const isOpenModalRequestExportSelector = (state: RootState) =>
  state.userManage.isOpenModalRequestExport;

export default userManageSlice.reducer;
