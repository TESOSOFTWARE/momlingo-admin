import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../common/redux/store';

type StateProps = {
  searchText?: string;
  isOpenModalDelete: boolean;
  selectedRows: number[];
}

const initialState: StateProps = {
  searchText: '',
  isOpenModalDelete: false,
  selectedRows: [],

};

export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    setIsOpenModalDelete: (state, action: PayloadAction<boolean>) => {
      state.isOpenModalDelete = action.payload;
    },
    setSearchText: (state, action: PayloadAction<string | undefined>) => {
      state.searchText = action.payload;
    },
    setSelectedRows: (state, action: PayloadAction<number[]>) => {
      state.selectedRows = action.payload;
    },
  },
});

export const {
  setIsOpenModalDelete,
  setSearchText,
  setSelectedRows,
} = eventSlice.actions;
export const searchTextSelector = (state: RootState) => state.event.searchText;
export const isOpenModalDeleteSelector = (state: RootState) => state.event.isOpenModalDelete;
export const selectedRowsSelector = (state: RootState) => state.event.selectedRows;
export default eventSlice.reducer;
