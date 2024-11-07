import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IStateProps } from './interface';

const initialState: IStateProps = {
  searchForm: '',
  confirmModal: {
    callback: () => { },
    isOpen: false,
    text: '',
  
  },
  searchParams:{
    page: 0,
    limit: 0,
    searchText:  null ,
  },
  isOpenPopupDelete:false
};

export const storeSlice = createSlice({
  name: 'storeInMap',
  initialState,
  reducers: {
    setConfirmModal: (state, action: PayloadAction<IStateProps['confirmModal']>) => {
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

    },
    setIsOpenPopupDelete: (state, action: PayloadAction<boolean>) => {
      state.isOpenPopupDelete = action.payload;

    },
    setSearchParams: (state, action: PayloadAction<IStateProps['searchParams']>) => {
      state.searchParams = action.payload;
    },
  },
});

export const {  setConfirmModal,setSearchParams, closeConfirmModal,setIsOpenPopupDelete, setSearchForm } = storeSlice.actions;

export default storeSlice.reducer;
