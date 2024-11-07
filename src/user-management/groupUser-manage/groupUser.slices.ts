import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/common/redux/store';
import { ISearchUser, IUser } from '../interfaces';
import { DEFAULT_VALUE_SEARCH_USER } from '../constants';

type StateProps = {
  isOpenModalDelete: boolean;
  selectedRow: number[];
  isOpenModalPickUser: boolean;
  listPickedUser: number[];
  isCheckAll:  boolean;
  dataCheckAllUsers: ISearchUser;
};

const initialState: StateProps = {
  isOpenModalDelete: false,
  selectedRow: [],
  isOpenModalPickUser: false,
  listPickedUser: [],
  isCheckAll: false,
  dataCheckAllUsers: DEFAULT_VALUE_SEARCH_USER,
};

export const groupUserManageSlice = createSlice({
  name: 'groupUserManage',
  initialState,
  reducers: {
    setIsOpenModalDelete: (state, action: PayloadAction<boolean>) => {
      state.isOpenModalDelete = action.payload;
    },
    setSelectedRow: (state, action: PayloadAction<number[]>) => {
      state.selectedRow = action.payload;
    },
    setIsOpenModalPickUser: (state, action: PayloadAction<boolean>) => {
      state.isOpenModalPickUser = action.payload;
    },
    setListPickedUser: (state, action: PayloadAction<number[]>) => {
      state.listPickedUser = action.payload;
    },
    setIsCheckAll: (state, action: PayloadAction<boolean>) => {
      state.isCheckAll = action.payload;
    },
    setDataCheckAllUsers: (state, action: PayloadAction<ISearchUser>) => {
      state.dataCheckAllUsers = action.payload;
    },
  },
});

export const {
  setIsOpenModalDelete,
  setSelectedRow,
  setIsOpenModalPickUser,
  setListPickedUser,
  setIsCheckAll,
  setDataCheckAllUsers,
} = groupUserManageSlice.actions;

export const isOpenModalDeleteSelector = (state: RootState) =>
  state.groupUserManage.isOpenModalDelete;
export const selectedRowSelector = (state: RootState) =>
  state.groupUserManage.selectedRow;
export const isOpenModalPickUserSelector = (state: RootState) =>
  state.groupUserManage.isOpenModalPickUser;
export const ListPickUserSelector = (state: RootState) =>
  state.groupUserManage.listPickedUser;
export const isCheckAllSelector = (state: RootState) =>
  state.groupUserManage.isCheckAll;

export const dataCheckAllUserSelector = (state: RootState) =>
  state.groupUserManage.dataCheckAllUsers;



export default groupUserManageSlice.reducer;
